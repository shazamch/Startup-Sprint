import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FaUsers, FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import placeholderimg from '../../../assets/placeholder-startup.jpg';
import { useDarkMode } from '../../../context/DarkModeContext';
import StartupTimeline from '../StartupTimeline';
import FundingTrendChart from '../../chart/FundingTrendChart';
import CrossButton from "../../../elements/crossButton/CrossButton";
import './startupprofile.css';

function StartupProfile(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { startup } = location.state || {};
  
  const [showChart, setShowChart] = useState(false);
  const { isDarkMode } = useDarkMode();
  const {
    name,
    profilephoto,
    description,
    members,
    evaluation,
    funds,
    timelineData,
    fundingTrendData,
  } = startup;
  const totalMembers = members?.length + 1 || 1;

  // Navigate to the previous page when the cross button is clicked
  const handleCrossClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-auto rounded-lg border bg-blue-50">
      <div className="mt-2 mb-4">
        <div className="flex flex-col bg-white dark:bg-gray-800 pt-12 pb-8 px-4 mx-4 rounded-lg mt-6 relative">
        <CrossButton
        className="absolute top-2 right-2 text-xl text-gray-800 dark:text-white"
        onClick={handleCrossClick}
        />
          <div className="flex flex-row justify-between items-center">
            <div className="flex justify-start items-center gap-x-4 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={profilephoto || placeholderimg}
                  alt={`${name} image`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                  {name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex space-x-4 justify-end">
              <button
                type="button"
                className={`${
                  isDarkMode
                    ? 'text-black dark:bg-[#e7c94d] dark:hover:bg-white dark:hover:text-black'
                    : 'text-white bg-[#1836b2] hover:bg-[#e7c94d] hover:text-[#1836b2]'
                } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2`}
              >
                Join
              </button>
              <button
                type="button"
                className={`${
                  isDarkMode
                    ? 'text-black dark:bg-[#e7c94d] dark:hover:bg-white dark:hover:text-black'
                    : 'text-white bg-[#1836b2] hover:bg-[#e7c94d] hover:text-[#1836b2]'
                } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2`}
              >
                Invest
              </button>
            </div>
          </div>
          {/* Second Container */}
          <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
            <div className="mt-8 ml-4">
              <div className="flex items-center justify-start gap-x-16">
                <div className="flex items-center text-sm">
                  <FaUsers className="mr-2 text-4xl text-[#1836b2] dark:text-[#e7c94d]" />
                  <span className="text-gray-800 dark:text-white font-bold">
                    {totalMembers} Members
                  </span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="mr-2 text-4xl text-[#1836b2] dark:text-[#e7c94d]" />
                  <span className="text-gray-800 dark:text-white">
                    Valuation: <span className="font-bold">{evaluation}</span>
                  </span>
                </div>
                <div
                  className="relative flex items-center"
                  onMouseEnter={() => setShowChart(true)}
                  onMouseLeave={() => setShowChart(false)}
                >
                  <FaPiggyBank className="mr-2 text-4xl text-[#1836b2] dark:text-[#e7c94d]" />
                  <span className="text-gray-800 dark:text-white">
                    Investments: <span className="font-bold">{funds}</span>
                  </span>
                  {showChart && (
                    <div className="absolute top-[-225px] left-0 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg z-10">
                      <FundingTrendChart data={fundingTrendData} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 mt-12">
              Timeline
            </h1>
            <StartupTimeline data={timelineData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupProfile;
