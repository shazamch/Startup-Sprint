import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProfileHeader({ selectedTab, setSelectedTab }) {
    // Define variables for dynamic values
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const profileImageUrl = user.profilephoto;
    const userName = user.name;
    const userBio = user.bio || "A computer scientist";

    const navigate = useNavigate();
    const handleAddStartupClick = () => {
        navigate('/addstartup');
      };
    const handleAddPostClick = () => {
    navigate('/addpost');
    };
    
    return (
        <div className="flex flex-col items-center w-full px-4">
            <div className="flex items-center flex-col mt-5">
                <div
                    className="rounded-full border-4 border-white"
                    style={{
                        width: '168px',
                        height: '168px',
                        backgroundImage: `url("${profileImageUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>
          
                {/* User Info */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-left font-bold text-3xl text-black dark:text-white sm:text-2xl">
                        {userName}
                    </h1>
                    <a
                        href="#"
                        className="text-left text-[#1836b2] dark:text-[#e7c94d] font-semibold text-sm sm:text-base"
                    >
                        {userBio}
                    </a>
                </div>
            </div>
      
            <hr className="w-full max-w-2/3 mt-2 border-gray-300 dark:border-gray-700" />
      
            {/* Tabs Section */}
            <div className="w-full flex justify-center px-4 mt-4">
                <div className="flex flex-wrap justify-between mb-2.5 w-full max-w-3xl">
                    <ul className="flex flex-wrap justify-center px-5 py-1.5 gap-2 sm:gap-3">
                        <li
                            className={`px-3 font-semibold ${selectedTab === 'posts' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
                            onClick={() => setSelectedTab('posts')}
                        >
                            <Link to="#">Posts</Link>
                        </li>
                        <li
                            className={`px-3 font-semibold ${selectedTab === 'startups' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
                            onClick={() => setSelectedTab('startups')}
                        >
                            <Link to="#">Startups</Link>
                        </li>
                    </ul>
                    <ul className="flex gap-2 sm:gap-4">
                        <li className="font-semibold">
                            <button onClick={handleAddStartupClick} className="text-white dark:text-black dark:bg-[#e7c94d] dark:hover:bg-white dark:hover:text-black bg-[#1836b2] hover:bg-white hover:text-[#1836b2] hover:border-[#1836b2] dark:hover:border-[#e7c94d] px-4 py-1 rounded-md border-2 border-transparent text-sm sm:text-base">
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Create a Startup
                            </button>
                        </li>
                        <li className="font-semibold">
                            <button onClick={handleAddPostClick} className="text-custom-blue border-custom-blue dark:text-black dark:bg-white dark:hover:bg-[#e7c94d] dark:hover:text-black bg-white hover:bg-custom-blue hover:text-white hover:border-[#1836b2] dark:hover:border-[#e7c94d] px-4 py-1 rounded-md border-2 text-sm sm:text-base dark:border-[#e7c94d]">
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Create a Post
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
