import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/mainLogo.png';

function SplashScreen({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
      <img src={logo} alt="Main Logo" className="h-64 w-64 mb-6" />
      <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
        Startup Sprint
      </h1>
      <p className="text-2xl font-light text-gray-700 italic drop-shadow-md tracking-wide">
        Sprint Towards Success
      </p>
    </div>
  );
}

export default SplashScreen;
