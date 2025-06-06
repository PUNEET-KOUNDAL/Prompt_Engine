import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-green-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>© {new Date().getFullYear()} Sparkie AI</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-green-500 animate-pulse" /> for you
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 hover:underline">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 hover:underline">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;