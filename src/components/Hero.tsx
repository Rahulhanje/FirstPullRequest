import React from 'react';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 -z-10" />
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-5 mix-blend-overlay" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 animate-fade-in">
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Open source for everyone
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
            Kickstart Your Open Source Journey Today
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Find beginner-friendly issues and make meaningful contributions to projects you love.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              to="/issues" 
              className="group px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 w-full sm:w-auto relative overflow-hidden"
            >
              <Search className="w-5 h-5" />
              <span>Find Issues</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            
            <Link 
              to="/OpenSourceDocumentation" 
              className="group px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 w-full sm:w-auto relative overflow-hidden"
            >
              Learn More
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 inline" />
            </Link>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Hero;