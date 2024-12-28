import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDarkMode } from '../../../context/DarkModeContext.jsx';
import ButtonWithIcon from '../../../elements/buttonWithIcon/ButtonWithIcon.jsx';
import { useDispatch } from 'react-redux';
import postsMiddleware from "../../../redux/middleware/postMiddleware.js";
import CrossButton from '../../../elements/crossButton/CrossButton.jsx';
import startupMiddleware from "../../../redux/middleware/startupMiddleware.js"

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const [attachedFile, setAttachFile] = useState([]);
  const [startups, setStartups] = useState([]);
  const [postData, setPostData] = useState({
    posttext: "",
    privacy: "Everyone",
    startupID: "",
    startupName: "",
  });

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const UserID = user._id;        
        const response = await dispatch(startupMiddleware.GetStartupsByUserID(UserID));
        if (response.success) {
          setStartups(response.data);
        } else {
          console.error("Error fetching startups:", response.message);
        }
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    setAttachFile(file);
  };

  const handleRemoveImage = () => {
    setAttachFile([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartupChange = (e) => {
    const { name, value } = e.target;
    const selectedStartup = startups.find(startup => startup._id === value);
    setPostData((prevData) => ({
      ...prevData,
      startupID: selectedStartup ? selectedStartup._id : "",
      startupName: selectedStartup ? selectedStartup.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();
    formData.append('posttext', postData.posttext);
    formData.append('privacy', postData.privacy);
    formData.append('startupID', postData.startupID);
    formData.append('startupName', postData.startupName);

    // Append the image file if selected
    if (attachedFile) {
      for (const file of attachedFile) {
        formData.append('imagefile', file);
      }
    }

    try {
      const response = await dispatch(postsMiddleware.AddPost(formData));
      if (response.success) {
        console.log("Post Added Successfully.");
        navigate('/dashboard');
      } else {
        console.error("Error adding post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={`rounded-lg p-6 shadow-md max-w-full h-[calc(100vh-100px)] border ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className={`mb-[15px] font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Add Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6 h-[calc(100vh-240px)] overflow-auto">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="posttext" className="block font-bold mb-[5px]">Post Text</label>
            <textarea
              id="posttext"
              name="posttext"
              value={postData.posttext}
              onChange={handleInputChange}
              className={`w-full p-4 border rounded-md ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-black border-gray-300'
              }`}
  
            />
          </div>
  
          <div>
            <label htmlFor="privacy" className={`block font-bold mb-[5px] ${isDarkMode ? 'text-white' : 'text-black'}`}>Privacy</label>
            <select
              id="privacy"
              name="privacy"
              value={postData.privacy}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Everyone">Everyone</option>
              <option value="Private">Private</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="startupName" className={`block font-bold mb-[5px] ${isDarkMode ? 'text-white' : 'text-black'}`}>Select Startup</label>
            <select
              id="startupName"
              name="startupName"
              value={postData.startupName}
              onChange={handleStartupChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Startup</option>
              {startups.map((startup) => (
                <option key={startup._id} value={startup._id}>
                  {startup.name}
                </option>
              ))}
            </select>
          </div>
  
          <div className="w-full py-2">
            <p className={`block font-bold mb-[5px] ${isDarkMode ? 'text-white' : 'text-black'}`}>Attach Post Image</p>
            <div className='flex items-center justify-start gap-4'>
              <div className="relative inline-block border border-gray-300 rounded-md p-1 ">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 py-1"
                />
                <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Choose File</span>
              </div>
              <span className="text-gray-700 flex items-center">
                {attachedFile?.length > 0 ? attachedFile?.map(file => file.name).join(', ') : 'No file selected'}
                {attachedFile?.length > 0 &&
                  <CrossButton className='w-8 h-8' onClick={handleRemoveImage} />
                }
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonWithIcon
            type="button"
            onClick={handleCancel}
            text="Discard"
            className="bg-red-600 text-white px-3 py-2 rounded-full min-w-[100px]"
          />
          <ButtonWithIcon
            type="submit"
            text="Save"
            className="bg-blue-600 text-white px-3 py-2 rounded-full min-w-[100px]"
          />
        </div>
      </form>
    </div>
  );
  };

export default AddPost;
