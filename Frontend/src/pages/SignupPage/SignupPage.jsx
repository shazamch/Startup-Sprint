import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { signup } from '../../redux/actions/userAction'; // Import signup action
import { FaArrowLeft } from 'react-icons/fa'; 
import logo from '../../assets/mainLogo.png';
import PasswordInput from '../../elements/passwordInput/PasswordInput';
import { useDarkMode } from '../../context/DarkModeContext';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }

    try {
      // Dispatch signup action
      const response = await dispatch(signup(formData));
      console.log(response)
      console.log('Sign up successful.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign-up failed:', error.message);
      alert(error.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    > 
      {/* Back Arrow Button */}
            <button
              onClick={() => navigate('/home')}
              className="absolute top-8 left-8 text-lg focus:outline-none"
            >
              <FaArrowLeft
                className={`text-2xl ${
                  isDarkMode ? 'text-white' : 'text-black'
                } hover:opacity-80 transition-opacity`}
              />
            </button>
      
      <div className='flex justify-start gap-x-4 items-center'>
              <img
                src={logo}
                alt="Main Logo"
                className={`h-20 w-20 mb-6 ${isDarkMode ? 'filter invert' : ''}`}
              />
              <h1 className="text-2xl font-bold dark:text-white text-gray-800 mb-2 drop-shadow-lg">
                Startup Sprint
              </h1>
      </div>

      {/* Sign-Up Form */}
      <div
        className={`p-8 rounded-lg shadow-lg w-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Sign Up
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Name and Email Fields in a row */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="name" className="text-sm font-medium block">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g., John Doe"
                value={formData.name}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="text-sm font-medium block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g., john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>
          </div>

          {/* Password and Confirm Password Fields in a row */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="e.g., ********"
                value={formData.password}
                onChange={handleChange}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'
                }`}
                required
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="e.g., ********"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'
                }`}
                required
              />
            </div>
          </div>

          {/* Gender Field */}
          <label htmlFor="gender" className="text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
            }`}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className={`py-2 rounded-md font-semibold hover:shadow-lg transition-all ${
              isDarkMode ? 'text-black bg-white' : 'bg-[#1836b2] text-white'
            }`}
          >
            Sign Up
          </button>
        </form>

        {/* Additional Options */}
        <p
          className={`mt-4 text-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="dark:text-[#e7c94d] text-gray-800 hover:underline border-none bg-transparent focus:outline-none"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
