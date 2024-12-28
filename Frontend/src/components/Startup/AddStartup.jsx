import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext.jsx';
import ButtonWithIcon from '../../elements/buttonWithIcon/ButtonWithIcon.jsx';
import { useDispatch } from 'react-redux';
import startupMiddleware from '../../redux/middleware/startupMiddleware.js';
import CrossButton from '../../elements/crossButton/CrossButton.jsx';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGlobe, FaPlus, FaTimes } from 'react-icons/fa';

const AddStartup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const [attachedFile, setAttachFile] = useState(null);
  const [newLink, setNewLink] = useState({
    label: '',
    url: '',
  });

  const [startupData, setStartupData] = useState({
    name: '',
    description: '',
    story: '',
    funds: '',
    evaluation: '',
    profilephoto: '',
    type: 'Service',
    links: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      website: '',
      morelinks: [],
    },
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    members: [],
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStartupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const addressField = name.split(".")[1]; 
      setStartupData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
  };

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setStartupData((prevData) => ({
      ...prevData,
      links: {
        ...prevData.links,
        [name]: value,
      },
    }));
  };  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAttachFile(file);
  };

  const handleRemoveImage = () => {
    setAttachFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', startupData.name);
    formData.append('description', startupData.description);
    formData.append('story', startupData.story);
    formData.append('funds', startupData.funds);
    formData.append('evaluation', startupData.evaluation);
    formData.append('type', startupData.type);
    formData.append('status', startupData.status);

    if (attachedFile) {
      formData.append('imagefile', attachedFile);
    }

    Object.entries(startupData.address).forEach(([key, value]) => {
      formData.append(`address.${key}`, value);
    });

    Object.entries(startupData.links).forEach(([key, value]) => {
      formData.append(`links.${key}`, value);
    });


    try {
      const response = await dispatch(startupMiddleware.AddStartup(formData));
      if (response.success) {
        console.log('Startup added successfully.');
        navigate('/dashboard');
      } else {
        console.error('Error adding startup:', response.message);
      }
    } catch (error) {
      console.error('Error adding startup:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className={`rounded-lg p-6 shadow-md max-w-full h-[calc(100vh-100px)] border ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className={`mb-[15px] font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
        Add Startup
      </h1>
      <form className="space-y-6 h-[calc(100vh-240px)] overflow-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-[10px] mb-[15px] w-full px-2">
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="funds" className="block font-bold mb-[5px]">Name</label>
                    <input
                    id="name"
                    name="name"
                    value={startupData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="funds" className="block font-bold mb-[5px]">Initial Investments</label>
                    <input
                    type='number'
                    id="funds"
                    name="funds"
                    value={startupData.funds}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md "
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="evaluation" className="block font-bold mb-[5px]">Valuation</label>
                <input
                  type='number'
                  id="evaluation"
                  name="evaluation"
                  value={startupData.evaluation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block font-bold mb-[5px]">Description</label>
            <textarea
              id="description"
              name="description"
              value={startupData.description}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="story" className="block font-bold mb-[5px]">Story</label>
            <textarea
              id="story"
              name="story"
              value={startupData.story}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
            />
          </div>

          <div>
            <label htmlFor="type" className="block font-bold mb-[5px]">Type</label>
            <select
              id="type"
              name="type"
              value={startupData.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

        <h1>Address</h1>
          <div className="flex flex-wrap gap-[10px] mb-[15px] w-full px-2">
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="street1" className="block font-bold mb-[5px]">
                Street 1
                </label>
                <input
                id="street1"
                name="address.street1"
                value={startupData.address.street1}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="street2" className="block font-bold mb-[5px]">
                Street 2
                </label>
                <input
                id="street2"
                name="address.street2"
                value={startupData.address.street2}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
        </div>

        <div className="flex flex-wrap gap-[10px] mb-[15px] w-full px-2">
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="city" className="block font-bold mb-[5px]">
                City
                </label>
                <input
                id="city"
                name="address.city"
                value={startupData.address.city}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="state" className="block font-bold mb-[5px]">
                State
                </label>
                <input
                id="state"
                name="address.state"
                value={startupData.address.state}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="zipcode" className="block font-bold mb-[5px]">
                Zipcode
                </label>
                <input
                id="zipcode"
                name="address.zipcode"
                value={startupData.address.zipcode}
                onChange={handleAddressChange}
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="country" className="block font-bold mb-[5px]">
                Country
                </label>
                <input
                id="country"
                name="address.country"
                value={startupData.address.country}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                />
            </div>
        </div>

        <h1>Links</h1>
        <div className="flex flex-wrap gap-[10px] mb-[15px] w-full px-2">
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="facebook" className="font-bold mb-[5px] flex items-center">
                <FaFacebook className="mr-2" /> Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={startupData.links.facebook}
                  onChange={handleLinksChange}
                  className="w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="instagram" className="font-bold mb-[5px] flex items-center">
                <FaInstagram className="mr-2" /> Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={startupData.links.instagram}
                  onChange={handleLinksChange}
                  className="w-full border border-gray-300 rounded-md"
                />
            </div>
            </div>

            <div className="flex flex-wrap gap-[10px] mb-[15px] w-full px-2">
            <div className="flex-1 min-w-[1px]">
                <label htmlFor="linkedin" className="font-bold mb-[5px] flex items-center">
                <FaLinkedin className="mr-2" /> LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={startupData.links.linkedin}
                  onChange={handleLinksChange}
                  className="w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="twitter" className="font-bold mb-[5px] flex items-center">
                <FaTwitter className="mr-2" /> Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={startupData.links.twitter}
                  onChange={handleLinksChange}
                  className="w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex-1 min-w-[1px]">
                <label htmlFor="website" className="font-bold mb-[5px] flex items-center">
                <FaGlobe className="mr-2" /> Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={startupData.links.website}
                  onChange={handleLinksChange}
                  className="w-full border border-gray-300 rounded-md"
                />
            </div>
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
      </form>

      <div className="flex flex-wrap justify-center gap-4">
          <ButtonWithIcon
            type="button"
            onClick={handleCancel}
            text="Discard"
            className="bg-red-600 text-white px-3 py-2 rounded-full"
          />
          <ButtonWithIcon
            onClick={handleSubmit}
            text="Submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-full"
          />
        </div>
    </div>
  );
};

export default AddStartup;
