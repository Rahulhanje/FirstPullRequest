import React from 'react';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen flex items-center relative overflow-hidden" role="banner">
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
            Find Your First Open Source Contribution Today
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover beginner-friendly GitHub issues labeled "good first issue" and "documentation". Perfect for new developers starting their open source journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full px-4">
            <Link 
              to="/issues" 
              className="group px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 w-full max-w-xs sm:max-w-none relative overflow-hidden text-center"
              aria-label="Browse beginner-friendly GitHub issues"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-sm sm:text-base">Find GitHub Issues</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            
            <Link 
              to="/OpenSourceDocumentation" 
              className="group px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 w-full max-w-xs sm:max-w-none relative overflow-hidden text-center"
              aria-label="Learn about open source contribution"
            >
              <span className="text-sm sm:text-base">Learn Open Source</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 inline" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>

          {/* SEO-optimized feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>1000+ Beginner Issues</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>10+ Programming Languages</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;