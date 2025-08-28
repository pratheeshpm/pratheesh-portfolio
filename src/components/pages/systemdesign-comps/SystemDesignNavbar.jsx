import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SystemDesignNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0 w-full z-30 transition-colors duration-700 ${isScrolled ? 'bg-black/90' : ''}`}>
      <div className='flex flex-row gap-4 items-center'>
        <NavLink to='/' className='text-[1.1rem] lg:text-[1.3rem] hover:text-primary-color hover:scale-125 duration-500'>
          <i className='bx bx-home-heart mr-2'></i>
          Home
        </NavLink>
        <span className="text-gray-400 mx-2">|</span>
        <h1 className='text-[1.1rem] lg:text-[1.3rem] text-gray-200'>
          <i className='bx bx-brain mr-2 text-base'></i>
          System Design
        </h1>
      </div>
    </header>
  );
};

export default SystemDesignNavbar;