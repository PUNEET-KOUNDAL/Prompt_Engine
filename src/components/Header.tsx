import React from 'react';
import { Sparkles, MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Sparkles className="h-6 w-6" />
          <span>Prompt Engine</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="hover:text-purple-300 transition-colors">
            Home
          </Link>
          <Link to="/examples" className="hover:text-purple-300 transition-colors">
            Examples
          </Link>
          <Link to="/pricing" className="hover:text-purple-300 transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-purple-300 transition-colors">
            About
          </Link>
          <Link 
            to="/create" 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-800 px-4 py-2">
          <nav className="flex flex-col space-y-3 py-2">
            <Link 
              to="/"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/examples" 
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <Link 
              to="/pricing" 
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/create" 
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors inline-block w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;