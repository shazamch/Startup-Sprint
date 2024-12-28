import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import StartupCard from '../../components/Startup/StartupCard';
import startupMiddleware from '../../redux/middleware/startupMiddleware';

function Startups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filters
  const [startupTypeFilter, setStartupTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique countries from startups
  const [countries, setCountries] = useState([]);

  // Hardcoded array of industry types
  const industryTypes = [
    'Finance',
    'Healthcare',
    'Education',
    'Technology',
    'Retail',
    'Manufacturing',
    'Real Estate',
  ];

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await dispatch(startupMiddleware.GetAllStartups());
        if (response.success) {
          setStartups(response.data);

          // Extract unique countries from the startups
          const uniqueCountries = [
            ...new Set(
              response.data.map((startup) => startup.address?.country)
            ),
          ];
          setCountries(uniqueCountries);
        } else {
          console.error('Error fetching startups:', response.message);
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [dispatch]);

  // Handle card click navigation
  const handleCardClick = (startup) => {
    navigate(`/startups/startupprofile/${startup._id}`, { state: { startup } });
  };

  // Apply filters to startups based on selected filters
  const filteredStartups = startups.filter((startup) => {
    const matchesStartupType = startupTypeFilter
      ? startup.type === startupTypeFilter
      : true;
    const matchesIndustry = industryFilter
      ? startup.industry === industryFilter
      : true;
    const matchesLocation = locationFilter
      ? startup.address?.country === locationFilter
      : true;
    const matchesSearchQuery =
      searchQuery === '' ||
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesStartupType &&
      matchesIndustry &&
      matchesLocation &&
      matchesSearchQuery
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setStartupTypeFilter('');
    setIndustryFilter('');
    setLocationFilter('');
    setSearchQuery(''); // Reset the search query as well
  };

  return (
    <div className="">

      <div className="flex items-center space-x-4 mt-30 mb-2 ">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-full md:w-1/4 ml-5">
          <label className="block text-sm font-medium text-gray-700 mr-2">
            {' '}
            {/* Added margin-right to space it from the input */}
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              className="p-2 pl-8 border rounded w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Search Query"
            />
            {/* Search Icon inside the input */}
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 h-[calc(100vh-100px)] overflow-auto rounded-lg border bg-blue-50 ">
        {/* Filter section at the top of the startup list */}
        <div className="flex flex-wrap gap-4 p-4 w-full bg-white rounded-t-lg items-center justify-center">
          {/* Startup Type Filter */}
          <div className="flex flex-col w-full sm:w-full md:w-1/5">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              className="mt-1 p-2 border rounded w-full text-sm"
              value={startupTypeFilter}
              onChange={(e) => setStartupTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Industry Type Filter */}
          <div className="flex flex-col w-full sm:w-full md:w-1/5">
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              className="mt-1 p-2 border rounded w-full text-sm"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">All Industries</option>
              {industryTypes.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex flex-col w-full sm:w-full md:w-1/5">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              className="mt-1 p-2 border rounded w-full text-sm"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="flex sm:w-auto md:w-1/5 items-center justify-center sm:mt-0 mx-auto">
            <button
              className="mt-1 p-2 border rounded w-full text-sm bg-[#1836b2] text-white"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Startups list */}
        <div className="space-y-4 mt-2 mb-4 flex flex-col gap-6">
          {loading ? (
            <p className="text-gray-500">Loading startups...</p>
          ) : (
            <div className="space-y-4 mt-2 mb-4">
              {filteredStartups.length === 0 ? (
                <p className="text-gray-500">No startups available.</p>
              ) : (
                filteredStartups.map((startup) => (
                  <StartupCard
                    key={startup._id}
                    image={startup.profilephoto || 'placeholderimg'}
                    name={startup.name}
                    description={startup.description}
                    members={12}
                    valuation={startup.evaluation}
                    investments={startup.funds}
                    location={startup.address?.country || 'Unknown'}
                    startdt={String(startup.createdAt)}
                    onClick={() => handleCardClick(startup)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Startups;
