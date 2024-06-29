import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-darkBg text-secondary dark:text-darkText py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Vikriti 1.0</h1>
        <p className="text-lg mt-2">Created by: Aryadeep Gogoi</p>
        <p className="italic mt-2">"Aesthetic quote here"</p>
        <nav className="mt-4">
          <Link href="/"  className="text-lg font-bold mx-2">Home</Link>
          <Link href="/interact" className="text-lg font-bold mx-2">Interact</Link>
          <Link href="/dummy"className="text-lg font-bold mx-2">Dummy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
