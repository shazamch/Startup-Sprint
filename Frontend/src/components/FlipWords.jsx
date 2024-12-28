import React, { useState, useEffect } from "react";

export const FlipWords = ({ words, interval = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordSwitch = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(wordSwitch);
  }, [words, interval]);

  return (
    <span className="text-primary font-bold mx-2 bg-white dark:bg-gray-900 text-[#1836b2] dark:text-[#e7c94d]">
      {words[currentWordIndex]}
    </span>
  );
};
