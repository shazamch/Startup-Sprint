import React from "react";
import {
  motion,
} from "framer-motion";
import { useDarkMode } from '../context/DarkModeContext';

import instagram from "../assets/instagram.svg";
import chrome from "../assets/chrome.svg";
import discord from "../assets/discord.svg";
import apple from "../assets/apple.svg";
import dribble from "../assets/dribble.svg";
import facebook from "../assets/facebook.svg";
import openai from "../assets/openai.svg";
import ibm from "../assets/ibm.svg";
import paypal from "../assets/paypal.svg";
import pepsi from "../assets/pepsi.svg";
import airbnb from "../assets/airbnb.svg";
import samsung from "../assets/samsung.svg";
import ycombinator from "../assets/ycombinator.svg";
import squarespace from "../assets/squarespace.svg";
import wix from "../assets/wix.svg";
import godaddy from "../assets/godaddy.svg";
import githubc from "../assets/githubc.svg";
import youtube from "../assets/youtube.svg";

function Partners() {

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const partners = [
    { id: 1, icon: <img src={instagram} alt="Instagram" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 2, icon: <img src={chrome} alt="Chrome" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 3, icon: <img src={discord} alt="Discord" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 4, icon: <img src={apple} alt="Apple" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 5, icon: <img src={dribble} alt="Dribble" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 6, icon: <img src={facebook} alt="Facebook" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 7, icon: <img src={openai} alt="OpenAI" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 8, icon: <img src={ibm} alt="IBM" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 9, icon: <img src={paypal} alt="PayPal" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 10, icon: <img src={pepsi} alt="Pepsi" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 11, icon: <img src={airbnb} alt="Airbnb" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 12, icon: <img src={samsung} alt="Samsung" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 13, icon: <img src={ycombinator} alt="Y Combinator" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 14, icon: <img src={squarespace} alt="Squarespace" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 15, icon: <img src={wix} alt="Wix" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 16, icon: <img src={godaddy} alt="GoDaddy" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 17, icon: <img src={githubc} alt="GitHub" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
    { id: 18, icon: <img src={youtube} alt="YouTube" className={`w-14 h-14 ${isDarkMode ? 'filter invert' : ''}`} /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 mt-0 mb-48">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <Text />

        {/* First Line - Icons moving from the right */}
        <motion.div
          className="flex justify-center max-sm:gap-x-4 sm:space-x-12"
          animate={{
            x: [500, 0], // Move from right to left
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15, // Slowed down the animation
            ease: "linear",
          }}
        >
          {partners.slice(0, 9).map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ scale: 1.2 }}
            >
              {partner.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Spacer between the two lines */}
        <div className="my-12"></div>

        {/* Second Line - Icons moving from the left */}
        <motion.div
          className="flex justify-center max-sm:gap-x-4 sm:space-x-12"
          animate={{
            x: [-500, 0], // Move from left to right
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15, // Slowed down the animation
            ease: "linear",
          }}
        >
          {partners.slice(9).map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ scale: 1.2 }}
            >
              {partner.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const Text = ({ isDarkMode }) => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 pt-24 pb-12"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-6 text-4xl font-black uppercase text-black dark:text-white"
      >
        Our Partners
      </motion.h1>
    </section>
  );
};

export default Partners;
