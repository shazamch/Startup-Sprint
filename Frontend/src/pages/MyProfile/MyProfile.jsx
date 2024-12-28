import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileHeader from '../../components/myProfile/ProfileHeader';
import MyPosts from "../../components/myProfile/posts/MyPosts";
import MyStartups from "../../components/myProfile/MyStartups";

function Profile() {
    const [selectedTab, setSelectedTab] = useState("posts"); // Default tab is "posts"
    
    const userName = "Shazam Razaq";
    const aboutText = `Hi! I'm Shazam Razaq, a passionate computer scientist with a keen interest in leveraging technology to solve real-world problems. With a strong foundation in software development, data science, and artificial intelligence, I thrive in dynamic environments where I can innovate and push the boundaries of what's possible.`;

    const startups = [
        {
            name: "Startup 1",
            imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/"
        }
    ];

    const numberOfStartups = 1;

    return (
        <div className="rounded-lg bg-blue-50 dark:bg-yellow-100 px-4 h-[calc(100vh-100px)] overflow-auto">
            <div className="flex flex-col my-4 shadow bg-white dark:bg-gray-800 rounded-lg">
                {/* PROFILE HEADER */}
                <ProfileHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {/* END PROFILE HEADER */}

                {/* CONTENT */}
                <div className="flex flex-col pt-6 pb-16 px-8 justify-start gap-x-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-start gap-x-8">
                        {/* ABOUT */}
                        <div className="flex-1">
                            <div className="p-4 shadow rounded-lg bg-white dark:bg-gray-800 mb-4">
                                <h1 className="font-bold text-xl text-gray-900 dark:text-white">About</h1>
                                <p className="text-sm font-normal mt-4 mb-8 text-gray-700 dark:text-gray-300">
                                    {aboutText}
                                </p>
                            </div>
                        </div>

                        {/* Startups */}
                        <div className="flex-1 p-4 shadow rounded-lg bg-white dark:bg-gray-800">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl text-gray-900 dark:text-white">Startups</h1>
                                <Link to="/friends/myId" className="text-lg text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-700">See All Startups</Link>
                            </div>
                            <div>
                                <p className="text-base text-gray-400 dark:text-gray-500 mb-4">You're part of {numberOfStartups} startup{numberOfStartups > 1 ? 's' : ''}</p>
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
                                    {/* Repeat Startup Items */}
                                    {startups.map((startup, index) => (
                                        <div key={index} className="bg-white p-0.5 mb-8 dark:bg-gray-700">
                                            <img src={startup.imgUrl} className="w-24 h-24 rounded-md mt-2 cursor-pointer" />
                                            <Link to={startup.link} className="font-semibold text-sm text-gray-900 dark:text-white">{startup.name}</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Content Rendering */}
                    {selectedTab === 'posts' ? <MyPosts /> : <MyStartups />}
                </div>
                {/* END CONTENT */}
            </div>
        </div>
    );
}

export default Profile;
