import React from 'react';
import { FaBuilding } from 'react-icons/fa'; // Importing the organization icon

function RequestCard({
  userName,
  startupName,
  profilePic,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center px-2 md:px-4 py-4 mb-4 border border-gray-100 dark:border-gray-600 rounded-lg dark:bg-gray-800 text-black bg-white dark:text-white shadow-md">

      {/* Profile Picture as background */}
      <div
        className="w-12 h-12 rounded-full mr-4 bg-cover bg-center max-sm:align-middle"
        style={{ backgroundImage: `url(${profilePic || '/assets/images/default-profile.jpg'})` }}
        alt={`${userName}'s profile`}
      />

      {/* User and Startup Info */}
      <div className="flex-1 max-sm:text-center max-sm:mb-4">
        <h3 className="font-semibold text-lg">{userName}</h3>
        <div className="flex items-center text-sm text-gray-500">
          {/* Organization Icon */}
          <FaBuilding className="mr-2" />
          <p>{startupName}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          className="text-white dark:text-black bg-[#1836b2] hover:bg-white hover:text-[#1836b2] hover:border-[#1836b2] dark:bg-[#e7c94d] dark:hover:bg-white dark:hover:text-black dark:hover:border-[#e7c94d] px-4 py-2 rounded-md border-2 border-transparent"
        >
          Accept
        </button>
        <button
          className="text-white bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 px-4 py-2 rounded-md border-2 border-transparent"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestCard;
