import { motion } from 'framer-motion';
import Navbar from '../../components/navbar';

const Home = () => {
  return (
    <div className="bg-dark min-h-screen text-white pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6">
        {/* Background Image Overlay (Ganti URL dengan gambar gym asli nanti) */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover" alt="gym bg"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl font-extrabold leading-tight mb-6">
              REFRESH YOUR <br/>
              ROUTINE SHAPE <br/>
              <span className="text-primary">YOUR FITNESS</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Engaging in regular exercise not only amplifies well-being and fortifies the body but also diminishes the likelihood of injuries thereby optimizing health.
            </p>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-black px-8 py-4 rounded font-bold text-lg"
              >
                Join Now
              </motion.button>
              <button className="flex items-center gap-2 text-white font-semibold px-6 py-4 border border-gray-600 rounded hover:border-primary transition">
                Watch Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
