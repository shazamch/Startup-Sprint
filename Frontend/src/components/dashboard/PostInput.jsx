import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

function PostInput() {
    const navigate = useNavigate(); 
  const [inputValue, setInputValue] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userPhoto = user.profilephoto;

  const handlePhotoClick = () => {
    console.log('Photo icon clicked!');
  };

  return (
    <div className="flex items-center gap-4 p-1 bg-white border rounded-lg shadow-md w-full">
        <button onClick={() => navigate('/myposts')}>
        <img
            src={userPhoto}
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover"
        /></button>
      <div className="flex items-center gap-2 w-full">        
        <input
          type="text"
          value={inputValue}
          onClick={() => navigate('/addpost')}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />        
        <button
          onClick={handlePhotoClick}
          className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          <FaCamera />
        </button>
      </div>
    </div>
  );
}

export default PostInput;
