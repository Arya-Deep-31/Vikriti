import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary dark:bg-darkBg text-secondary dark:text-darkText overflow-hidden">
      <div className="flex flex-row gap-4">
        <div
          className="w-12 h-12 rounded-full animate-spin border-y border-solid border-primary-500 border-t-transparent shadow-md"
        ></div>
        <div
          className="w-12 h-12 rounded-full animate-spin border-y-2 border-solid border-violet-500 border-t-transparent shadow-md"
        ></div>
        <div
          className="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-secondary-500 border-t-transparent shadow-md"
        ></div>
        <div
          className="w-12 h-12 rounded-full animate-spin border-y-8 border-solid border-darkBg-500 border-t-transparent shadow-md"
        ></div>
      </div>
      <motion.h2
        className="mt-8 text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Initializing Vikriti
      </motion.h2>
    </div>
  );
};

export default Loader;
