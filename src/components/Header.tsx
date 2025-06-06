import React from 'react';
import { Sparkles, MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800"> {/* Changed text color */}
          <Sparkles className="h-6 w-6 text-blue-600" /> {/* Changed icon color */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Prompt Engine</span> {/* Added gradient to text */}
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700" // Changed icon color
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors"> {/* Changed text and hover color */}
            Home
          </Link>
          <Link to="/examples" className="text-gray-700 hover:text-blue-600 transition-colors">
            Examples
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link to="/education" className="text-gray-700 hover:text-blue-600 transition-colors">
            Docs
          </Link>
          <Link to="/career" className="text-gray-700 hover:text-blue-600 transition-colors">
            Career
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link
            to="/create"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-md transition-colors shadow-md" // Updated button gradient and shadow
          >
            Get Started
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/90 px-4 py-2 backdrop-blur-sm border-b border-gray-100 shadow-sm"> {/* Changed background to white with blur, added border/shadow */}
          <nav className="flex flex-col space-y-3 py-2">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors" // Changed text and hover color
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/examples"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/education"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
            <Link
              to="/career"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Career
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/create"
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-md transition-colors inline-block w-fit shadow-md" // Updated button gradient and shadow
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