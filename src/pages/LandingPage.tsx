import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/UI/ThemeToggle';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-brandBackground transition-colors duration-300 flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>
      
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[15%] hidden md:flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 border border-transparent dark:border-slate-700 rounded-2xl shadow-xl backdrop-blur-md transition-colors duration-300"
      >
        <span className="font-bold text-gray-800 dark:text-gray-100">AAPL</span>
        <span className="text-green-600 dark:text-green-400 font-medium">+2.45% </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-[15%] hidden md:flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 border border-transparent dark:border-slate-700 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-300"
      >
        <span className="font-bold text-gray-800 dark:text-gray-100">TSLA</span>
        <span className="text-red-600 dark:text-red-400 font-medium">-1.12% </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        
        <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold tracking-wide uppercase mb-6 inline-block shadow-sm transition-colors duration-300">
          Market Intelligence v1.0
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 transition-all duration-300">
          Master the Market. <br /> Simplified.
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto transition-colors duration-300">
          Your one-stop terminal for real-time insights, financial health metrics, and institutional-grade analytics. Make smarter decisions today.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-800 dark:hover:bg-blue-500 shadow-lg hover:shadow-blue-900/30 dark:hover:shadow-blue-600/30 transition-all flex items-center gap-2 mx-auto" 
          onClick={() => navigate('/dashboard')}
        >
          Launch Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;