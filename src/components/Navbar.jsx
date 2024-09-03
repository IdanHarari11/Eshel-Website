import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-10 bg-current">
      <nav className="opacity-95 flex justify-center w-full right-0 left-0" >
        <div className="mx-0 px-2 sm:px-6 lg:px-8 flex-1">
          <div className="flex h-24 items-center w-full">
            <div className="flex items-center">
              <img
                src="/images/logo.jpg"
                alt="Johnny Sins Logo"
                className="h-16 w-auto rounded-full"
              />
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-end sm:flex-1 right-0">
              <div className="flex space-x-6 flex-row">
                <a
                  href="/folder/FoldersList"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-950 hover:font-bold"
                  target="_self"
                >
                  מדיה
                </a>
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-950 hover:font-bold"
                  aria-current="page"
                  target="_self"
                >
                  עמוד הבית
                </a>
              </div>
            </div>
            <div className="sm:hidden flex items-center ml-auto">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="sm:hidden fixed inset-0 flex justify-end z-20">
          <div className="bg-gray-800 opacity-95 w-64 h-full p-4 relative">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a
              href="/folder/FoldersList"
              className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-950 hover:font-bold"
              target="_self"
            >
              מדיה
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-950 hover:font-bold"
              aria-current="page"
              target="_self"
            >
              עמוד הבית
            </a>
          </div>
        </div>
      )}
    </div>
  );
}