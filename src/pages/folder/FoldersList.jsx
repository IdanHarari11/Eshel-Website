import styles from "./FolderList.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchFolders();
    return () => {
      setError(null);
    };
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/google");
      if (!response.ok) {
        throw new Error("Failed to fetch folders");
      }
      const data = await response.json();
      const filteredData = data.filter(folder => folder.name !== 'אבא אתר');

      setFolders(filteredData);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="flex flex-col min-h-screen">
    <div className="bg-gradient-to-b from-gray-600 to-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px p-2">
      {folders.length > 0 ? folders?.map((folder) => (
        <Link
          key={folder.id}
          href={{
            pathname: `/folder/${folder.id}/${folder.name}`,
            query: { folder },
          }}
          legacyBehavior
        >
          <div className="flex flex-col items-center justify-center w-full h-64 rounded-3xl p-2">
            <div className="relative w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-2xl shadow-md flex items-center justify-center group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-600 opacity-50"></div>
              <svg
                className="w-12 sm:w-16 h-12 sm:h-16 text-gray-800 relative z-10 transition-transform duration-300 ease-in-out group-hover:scale-95"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex justify-center items-end pb-2">
                <div className="w-8 sm:w-10 h-10 sm:h-12 bg-blue-50 rounded-sm transform translate-y-full group-hover:-translate-y-2 transition-transform duration-300 ease-out opacity-0 group-hover:opacity-100"></div>
                <div className="w-8 sm:w-10 h-10 sm:h-12 bg-green-50 rounded-sm transform translate-y-full group-hover:-translate-y-4 transition-transform duration-300 ease-out delay-75 opacity-0 group-hover:opacity-100 mx-1"></div>
                <div className="w-8 sm:w-10 h-10 sm:h-12 bg-yellow-50 rounded-sm transform translate-y-full group-hover:-translate-y-6 transition-transform duration-300 ease-out delay-150 opacity-0 group-hover:opacity-100"></div>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-black cursor-pointer">{folder.name}</p>
          </div>
        </Link>
      )) : <></>}
    </div>
  </div>

    // <div className="flex flex-col min-h-screen">
    //   {/* Main Content */}
    //   <div className="flex-grow">
    //     <h2 className={styles.title}>תיקיות</h2>
    //     <div className={styles.folderGrid}>
    //       {folders?.map((folder) => (
    //         <Link
    //           key={folder.id}
    //           href={{
    //             pathname: `/folder/${folder.id}/${folder.name}`,
    //             query: { folder },
    //           }}
    //         >
    //           <p className={styles.folderItem}>
    //             <span className={styles.folderTitle}>{folder.name}</span>
    //           </p>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default FolderList;