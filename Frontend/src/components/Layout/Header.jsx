import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/mainLogo.png";
import { useDarkMode } from '../../context/DarkModeContext';

function Header() {
  const [hidden, setHidden] = useState(true);
  const location = useLocation();
  
  // Access dark mode state and toggle function from context
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav
      className={`w-full min-h-20 border-b border-gray-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse max-md:mt-2 max-md:mb-6">
          <img
            src={logo}
            alt="StartupSprint Logo"
            width={64}
            height={64}
            className={isDarkMode ? 'filter invert' : ''}
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            Startup Sprint
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Login Button */}
          <Link to="/login">
            <button
              type="button"
              className={`${
                isDarkMode
                  ? 'text-white border-2 dark:border-[#e7c94d] border-[#1836b2] bg-transparent hover:text-white'
                  : 'text-[#1836b2] border-2 border-[#1836b2] bg-transparent hover:text-black'
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mx-2`}
            >
              Login
            </button>
          </Link>
          {/* Get Started Button */}
          <Link to="/signup">
            <button
              type="button"
              className={`${
                isDarkMode
                  ? 'text-black dark:bg-[#e7c94d] dark:hover:bg-white dark:hover:text-black bg-[#1836b2] hover:bg-white hover:text-[#1836b2] hover:border-[#1836b2]'
                  : 'text-white bg-[#1836b2] hover:bg-white hover:text-[#1836b2] hover:border-[#1836b2]'
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center`}
            >
              Get Started
            </button>
          </Link>
          <button
            onClick={() => setHidden(!hidden)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode} // Use the toggle function from context
          className="ml-4 p-2 max-sm:px-0 max-sm:py-8 rounded-lg focus:outline-none"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
