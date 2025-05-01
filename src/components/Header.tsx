import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { FaCodePullRequest } from "react-icons/fa6";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto sm:px-20 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <FaCodePullRequest className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                FirstPullRequest
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link to="/issues" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                Issues
              </Link>

              <Link to="/git-cheatsheet" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                Git-Cheatsheet
              </Link>

              <Link to="/OpenSourceDocumentation" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                Doc
              </Link>
              <Link to="https://github.com/Rahulhanje/FirstPullRequest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                Github
              </Link>

            </nav>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>
            
          </div>
             
          <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="sm:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>   
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              
              <Link
                to="/issues"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Issues
              </Link>

              <Link
                to="/documentation"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                to="/git-cheatsheet"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Git Cheatsheet
              </Link>
              <Link
                to="https://github.com/Rahulhanje/FirstPullRequest"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Github
              </Link>
             

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;