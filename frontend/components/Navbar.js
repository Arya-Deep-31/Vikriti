import { useState } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import DarkModeToggle from './DarkModetoggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center py-3 px-6 bg-secondary dark:bg-darkBg shadow-md">
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-left space-x-4">
          <Link href="/" className="text-lg font-bold">Home</Link>
          <Link href="/interact" className="text-lg font-bold">Interact</Link>
          <Link href="/dummy" className="text-lg font-bold">Dummy</Link>
        </nav>
      </div>

      <div className="flex-grow flex justify-center items-center ">
        <img src="/logotext.webp" alt="Vikriti Logo" className="h-12" />
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <DarkModeToggle />
        <FaUserCircle className="text-2xl" />
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-primary dark:bg-darkBg flex flex-col items-center justify-center space-y-6 z-50">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl">
            <FaTimes />
          </button>
          <Link href="/" onClick={toggleMenu} className="text-2xl font-bold">Home</Link>
          <Link href="/interact" onClick={toggleMenu} className="text-2xl font-bold">Interact</Link>
          <Link href="/dummy" onClick={toggleMenu} className="text-2xl font-bold">Dummy</Link>
          <DarkModeToggle />
          <FaUserCircle className="text-2xl" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
