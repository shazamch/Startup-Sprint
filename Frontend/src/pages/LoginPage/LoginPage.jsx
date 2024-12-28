import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userAction';
import { FaArrowLeft } from 'react-icons/fa'; 
import logo from '../../assets/mainLogo.png';
import PasswordInput from '../../elements/passwordInput/PasswordInput';
import { useDarkMode } from '../../context/DarkModeContext';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const data = { email, password };

    setLoading(true);
    setError(null);
    try {
      await dispatch(login(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials, please try again.');
    } finally {
      setLoading(false);
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

      <div className="flex justify-start gap-x-4 items-center">
        <img
          src={logo}
          alt="Main Logo"
          className={`h-24 w-24 mb-6 ${isDarkMode ? 'filter invert' : ''}`}
        />
        <h1 className="text-2xl font-bold dark:text-white text-gray-800 mb-2 drop-shadow-lg">
          Startup Sprint
        </h1>
      </div>

      {/* Login Form */}
      <div
        className={`p-8 rounded-lg shadow-lg w-96 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Log In
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isDarkMode
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-white'
            }`}
            required
          />
          <div className="relative w-full mb-4">
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white'
              }`}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-md font-semibold hover:shadow-lg transition-all ${
              isDarkMode ? 'text-black bg-white' : 'bg-[#1836b2] text-white'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p
          className={`text-gray-600 mt-4 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="dark:text-[#e7c94d] text-gray-800 hover:underline border-none bg-transparent focus:outline-none"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
