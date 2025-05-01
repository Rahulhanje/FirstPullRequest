import React from 'react';
import { Github, Twitter, Mail, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800 px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            FirstPullRequest
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="mailto:contact@FirstPullRequest.dev" 
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="md:flex md:justify-between">
          <div className="max-w-md mb-6 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
            FirstPullRequest helps beginner developers find their first open source issues to contribute to, building confidence and real-world experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            
            {/* <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Community
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://discord.gg/FirstPullRequest" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/FirstPullRequest" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    Github
                  </a>
                </li>
              </ul>
            </div>
             */}
            
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FirstPullRequest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;