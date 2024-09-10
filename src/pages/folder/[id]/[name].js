import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../FolderContents.module.css'; // Import the CSS module
import Image from 'next/image';

export default function FolderContents() {
  const router = useRouter();
  const { id, name } = router.query;
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchFolderContents();
  }, [id]);

  const fetchFolderContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/google?folderId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch folder contents');
      }
      const data = await response.json();
      setContents(data.files);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loaderContainer}><div className={styles.loader}></div></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>חזור</button>
      <h2 className={styles.headerTitle}>{name}</h2>
      <div className={styles.folderGrid}>
        {contents?.map((item, index) => (
          <div key={item.id} className={styles.folderItem} style={{ animationDelay: `${index * 0.1}s` }}>
            {item.mimeType === 'application/vnd.google-apps.folder' ? (
              <Link href={`/folder/${item.id}`}>
                <a className={styles.folderLink}>
                  <div className={styles.folderImage}>
                  </div>
                  <div className={styles.folderTitle}>{item.name.substring(0, item.name.lastIndexOf('.')) || item.name}</div>
                </a>
              </Link>
            ) : (
              <a
                href={item.webViewLink}
                target='_blank'
                className={`${styles.folderLink} cursor-pointer text-blue-500 hover:underline`}>
                <div className={styles.folderImage}>
                  <Image
                    src={item.thumbnailLink}
                    alt={item.name}
                    className={styles.image}
                    width={220}
                    height={220}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                  />
                </div>
                <div className={styles.folderTitle}>{item.name.substring(0, item.name.lastIndexOf('.')) || item.name}</div>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}