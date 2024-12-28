import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileHeader from '../../components/myProfile/ProfileHeader';
import MyPosts from "../../components/myProfile/posts/MyPosts";
import MyStartups from "../../components/myProfile/MyStartups";

function Profile() {
    const [selectedTab, setSelectedTab] = useState("posts");
    
    const aboutText = `Hi! I'm Shazam Razaq, a passionate computer scientist with a keen interest in leveraging technology to solve real-world problems. With a strong foundation in software development, data science, and artificial intelligence, I thrive in dynamic environments where I can innovate and push the boundaries of what's possible.`;
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
