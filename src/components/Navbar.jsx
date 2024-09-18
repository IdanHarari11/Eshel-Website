import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Link from 'next/link';
import styles from './Navbar.module.css'; // Import the CSS module

export default function Navbar() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/google');
        const data = await response.json();
        setFolders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const items = [
    {
      label: 'דף הבית',
      icon: 'pi pi-fw pi-home',
      command: () => { router.push('/'); },
      className: router.pathname === '/' ? styles.activeItem : ''
    },
    {
      label: 'מדיה',
      icon: 'pi pi-fw pi-folder',
      items: folders.length > 0 ? folders?.map(folder => ({
        label: folder.name,
        command: () => { router.push(`/folder/${folder.id}/${folder.name}`); },
        className: name === folder.name.trim() ? styles.activeItem : styles.inactiveItem
      })): [],
      className: router.pathname.startsWith('/folder') ? styles.activeItem : ''
    }
  ];

  const start = (
    <img
      alt="logo"
      src="/images/אקס ליברס.png"
      height="40"
      width="40"
      className="rounded-full ml-5"
      onClick={() => router.push('/')}
      style={{ cursor: 'pointer' }}
    />
  );

  return (
    <div className="sticky top-0 z-10 bg-current flex justify-between items-center p-2" style={{backgroundColor: 'rgba(245, 246, 245, 66%)'}} dir="rtl">
      <div className="flex-shrink-0 order-2">
        {start}
      </div>
      <div className="flex-grow order-1">
        <Menubar model={items} className={styles.transparentMenubar} style={{backgroundColor: 'rgba(245, 246, 245, -0.2)'}} />
      </div>
    </div>
  );
}