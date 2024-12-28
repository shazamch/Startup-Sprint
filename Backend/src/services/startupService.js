const Startup = require('../models/startupModel');

// Create a new startup
const createStartup = async (startupData) => {
  const newStartup = new Startup(startupData);
  const savedStartup = await newStartup.save();
  return savedStartup;
};

// Get all startups
const getAllStartups = async () => {
  const startups = await Startup.find().populate('userID', 'name');
  return startups;
};

// Get a single startup by ID
const getStartupById = async (startupId) => {
  const startup = await Startup.findById(startupId).populate('userID', 'name email phone');
  if (!startup) {
    throw new Error('Startup not found');
  }
  return startup;
};

// Get startups by user ID (if needed)
const getStartupsByUserId = async (userId) => {
  const startups = await Startup.find({ userID: userId }).populate('userID', 'name email phone');
  return startups;
};

// Update a startup by ID
const updateStartup = async (startupId, updateData) => {
  const updatedStartup = await Startup.findByIdAndUpdate(startupId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedStartup) {
    throw new Error('Startup not found for update');
  }
  return updatedStartup;
};

// Delete a startup by ID
const deleteStartup = async (startupId) => {
  const deletedStartup = await Startup.findByIdAndDelete(startupId);
  if (!deletedStartup) {
    throw new Error('Startup not found for deletion');
  }
  return deletedStartup;
};

// Add a link to a startup's social media links
const addLinksToStartup = async (startupId, linksData) => {
  const startup = await Startup.findById(startupId);
  if (!startup) {
    throw new Error('Startup not found');
  }

  startup.links = { ...startup.links, ...linksData };
  await startup.save();

  return startup;
};

// Remove a link from the startup's social media links
const removeLinkFromStartup = async (startupId, linkType) => {
  const startup = await Startup.findById(startupId);
  if (!startup) {
    throw new Error('Startup not found');
  }

  if (startup.links[linkType]) {
    startup.links[linkType] = '';
    await startup.save();
  } else {
    throw new Error('Link type not found');
  }

  return startup;
};

module.exports = {
  createStartup,
  getAllStartups,
  getStartupById,
  getStartupsByUserId,
  updateStartup,
  deleteStartup,
  addLinksToStartup,
  removeLinkFromStartup,
};
