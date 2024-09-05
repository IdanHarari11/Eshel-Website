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
      items: folders.map(folder => ({
        label: folder.name,
        command: () => { router.push(`/folder/${folder.id}/${folder.name}`); },
        className: router.pathname.startsWith('/folder') ? styles.activeItem : styles.inactiveItem
      })),
      className: router.pathname.startsWith('/folder') ? styles.activeItem : ''
    }
  ];
  console.log("idan 🚀  ~ Navbar ~ router.pathname.startsWith('/folder'):", router.pathname.startsWith('/folder'));

  const start = (
    <img
      alt="logo"
      src="/images/logo.jpg"
      height="40"
      width="40"
      className="rounded-full ml-5"
      onClick={() => router.push('/')}
      style={{ cursor: 'pointer' }}
    />
  );

  return (
    <div className="sticky top-0 z-10 bg-white/80 flex justify-between items-center p-2" dir="rtl">
      <div className="flex-shrink-0 order-2">
        {start}
      </div>
      <div className="flex-grow order-1">
        <Menubar model={items} className={styles.transparentMenubar} style={{backgroundColor: 'rgba(255, 255, 255, -0.2)'}} />
      </div>
    </div>
  );
}