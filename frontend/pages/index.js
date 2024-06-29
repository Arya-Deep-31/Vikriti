import { motion } from 'framer-motion';
import { useState , useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import '../styles/global.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('/img1.webp');
  const [textContent, setTextContent] = useState('Text for Image 1');

  const handleImageChange = (image, text) => {
    setBackgroundImage(image);
    setTextContent(text);
  };

  const steps = [
    "Step 1: Description of the first step.",
    "Step 2: Description of the second step.",
    "Step 3: Description of the third step.",
    "Step 4: Description of the fourth step.",
    "Step 5: Description of the fifth step."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the loading duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-primary dark:bg-darkBg text-darkBg dark:text-darkText min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="container mx-auto px-8">
        {/* Landing Section */}
        <section 
          className="text-center py-40 relative"
        >
          <motion.h2 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Vikriti 1.0
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The first of its kind
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link href="/interact"
              className="bg-contrastYellow text-contrastBlue px-6 py-3 rounded-full text-lg font-bold">
                Get Started
            </Link>
          </motion.div>
        </section>
        
        {/* About Section */}
        <section className="flex flex-col md:flex-row items-center py-20">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img 
              src="/img.webp" 
              alt="About Image" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0 md:ml-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-4xl font-bold mb-4">
              About Vikriti 1.0
            </h3>
            <p className="text-lg">
              Innovative lines like a poet for this app which is built for communities to develop culture together. People can interact, share poems, art, and their helps in any project or UI work that can be interacted with me to fix and support or comment.
            </p>
          </motion.div>
        </section>

        {/* Explore Section */}
        <section className="text-center py-20 relative">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            What's To Explore
          </motion.h2>
          <div className="flex justify-center">
            <motion.div
              className="w-full h-96 rounded-lg shadow-lg relative"
              style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg bg-opacity-50 backdrop-blur-lg px-4 py-2 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {textContent}
              </motion.p>
            </motion.div>
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => handleImageChange('/img.webp', 'Text for Image 1')}
              className="w-12 h-12 rounded-full bg-white bg-opacity-50 backdrop-blur-lg"
            />
            <button
              onClick={() => handleImageChange('/img.webp', 'Text for Image 2')}
              className="w-12 h-12 rounded-full bg-white bg-opacity-50 backdrop-blur-lg"
            />
            <button
              onClick={() => handleImageChange('/img.webp', 'Text for Image 3')}
              className="w-12 h-12 rounded-full bg-white bg-opacity-50 backdrop-blur-lg"
            />
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <motion.h3 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            How to Use the Website
          </motion.h3>
          <div className="flex overflow-x-scroll">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="min-w-[300px] p-4 m-4 bg-secondary rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.5 }}
              >
                <img src="/img.webp" alt={`Step ${index + 1}`} className="w-full h-auto mb-4"/>
                <p className="text-lg">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
