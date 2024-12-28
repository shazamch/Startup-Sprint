// controllers/investmentController.js
const investmentService = require('../services/investmentService');

// Create Investment
const createInvestment = async (req, res) => {
  const { accessToken, refreshToken } = req.user;
  const { userID } = req.user;
  const investmentData = {
    ...req.body, 
    userID,
  };

  try {
    const investment = await investmentService.createInvestment(investmentData);
    res.sendResponse(201, true, 'Investment created successfully', investment, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get All Investments
const getAllInvestments = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const investments = await investmentService.getAllInvestments();
    res.sendResponse(200, true, 'Investments fetched successfully', investments, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Investment by ID
const getInvestmentById = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const investment = await investmentService.getInvestmentById(req.params.id);
    if (!investment) {
      return res.sendResponse(404, false, `Investment with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, 'Investment fetched successfully', investment, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Investments by User ID (assuming middleware provides userID)
const getInvestmentsByUserId = async (req, res) => {
  try {
    const { userID } = req.user;
    const { accessToken, refreshToken } = req.user;
    const investments = await investmentService.getInvestmentsByUserId(userID);
    res.sendResponse(200, true, 'Investments fetched successfully', investments, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Investments by Startup ID (assuming route includes startup ID)
const getInvestmentsByStartupId = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const startupId = req.params.startupId;
    const investments = await investmentService.getInvestmentsByStartupId(startupId);
    res.sendResponse(200, true, 'Investments fetched successfully', investments, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Update Investment
const updateInvestment = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const updatedInvestment = await investmentService.updateInvestment(req.params.id, req.body);
    if (!updatedInvestment) {
      return res.sendResponse(404, false, `Investment with ID ${req.params.id} not found for update`);
    }
    res.sendResponse(200, true, 'Investment updated successfully', updatedInvestment, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Delete Investment
const deleteInvestment = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const deletedInvestment = await investmentService.deleteInvestment(req.params.id);
    if (!deletedInvestment) {
      return res.sendResponse(404, false, `Investment with ID ${req.params.id} not found for deletion`);
    }
    res.sendResponse(200, true, 'Investment deleted successfully', deletedInvestment, {accessToken, refreshToken});
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

module.exports = {
  createInvestment,
  getAllInvestments,
  getInvestmentById,
  getInvestmentsByUserId,
  getInvestmentsByStartupId,
  updateInvestment,
  deleteInvestment,
};