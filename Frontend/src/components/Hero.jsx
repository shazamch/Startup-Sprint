import React from 'react';
import { SmoothScrollHero } from './SmoothScrollHero';
import { FlipWords } from './FlipWords';

function Hero() {
  const words = ["faster", "smarter", "stronger", "innovative"];

  return (
    <>

      <div className="mt-36 mb-14 flex justify-center items-center px-4">
        <div className="max-sm:text-4xl text-6xl mx-auto font text-black dark:text-white text-center">
          Build
          <FlipWords words={words} /> <br />
          startups with <span className='font-semibold'>Startup Sprint</span>
        </div>
      </div>

      <SmoothScrollHero />
    </>
  );
};

export default Hero;