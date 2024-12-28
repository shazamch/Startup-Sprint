// controllers/startupController.js
const startupService = require('../services/startupService');
const { uploadToS3, uploadMiddleware, deleteFromS3 } = require('../services/s3BucketService');

const FolderNames = {
  POSTS: "startupprofilephotos",
};

// Create Startup
const createStartup = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ success: false, error: { message: 'Image upload failed', details: err.message } });
    }

    try {
      const { accessToken, refreshToken } = req.user;
      const startupData = { ...req.body, userID: req.user.id };
      if (req.file) {
        const imageUrl = await uploadToS3(req.file, FolderNames.POSTS);
        startupData.profilephoto = imageUrl
      }
      const startup = await startupService.createStartup(startupData);
      if (!startup) {
        return res.sendResponse(500, false, 'Startup creation failed');
      }
      res.sendResponse(201, true, 'Startup created successfully', startup, { accessToken, refreshToken });
    } catch (error) {
      res.sendResponse(500, false, error.message);
    }
  })
};

// Get All Startups
const getAllStartups = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const startups = await startupService.getAllStartups();
    if (!startups) {
      return res.sendResponse(404, false, 'No startups found');
    }
    if (startups.length === 0) {
      return res.sendResponse(200, true, 'No startups yet', startups, { accessToken, refreshToken });
    }
    res.sendResponse(200, true, 'Startups fetched successfully', startups, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Startup by ID
const getStartupById = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const startup = await startupService.getStartupById(req.params.id);
    if (!startup) {
      return res.sendResponse(404, false, `Startup with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, 'Startup fetched successfully', startup, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Update Startup
const updateStartup = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const updatedStartup = await startupService.updateStartup(req.params.id, req.body);
    if (!updatedStartup) {
      return res.sendResponse(404, false, `Startup with ID ${req.params.id} not found for update`);
    }
    res.sendResponse(200, true, 'Startup updated successfully', updatedStartup, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Delete Startup
const deleteStartup = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const deletedStartup = await startupService.deleteStartup(req.params.id);
    if (!deletedStartup) {
      return res.sendResponse(404, false, `Startup with ID ${req.params.id} not found for deletion`);
    }
    res.sendResponse(200, true, 'Startup deleted successfully', deletedStartup, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Add Links to Startup
const addLinksToStartup = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const startup = await startupService.addLinksToStartup(req.params.id, req.body);
    if (!startup) {
      return res.sendResponse(404, false, `Startup with ID ${req.params.id} not found for adding links`);
    }
    res.sendResponse(200, true, 'Links added successfully', startup, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Remove Link from Startup
const removeLinkFromStartup = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const startup = await startupService.removeLinkFromStartup(req.params.id, req.params.linkType);
    if (!startup) {
      return res.sendResponse(404, false, `Startup with ID ${req.params.id} not found for removing link`);
    }
    res.sendResponse(200, true, 'Link removed successfully', startup, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Startups by User ID
const getStartupsByUserId = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const userId = req.user.id;
    const startups = await startupService.getStartupsByUserId(userId);
    if (!startups || startups.length === 0) {
      return res.sendResponse(404, false, `No startups found for user with ID ${userId}`);
    }

    res.sendResponse(200, true, 'Startups fetched successfully', startups, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

module.exports = {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
  addLinksToStartup,
  removeLinkFromStartup,
  getStartupsByUserId,
};
