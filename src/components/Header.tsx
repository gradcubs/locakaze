
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 dark:bg-black/40 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">L</span>
          </div>
          <span className="text-xl font-semibold text-primary">CreditLine</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Products</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">About</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Sign In
          </a>
          <button className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all transform hover:scale-[1.03] active:scale-[0.98] duration-200">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
