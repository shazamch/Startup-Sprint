// controllers/requestController.js
const requestService = require('../services/requestServices');

// Create Request
const createRequest = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const request = await requestService.createRequest(req.body);
    if (!request) {
      return res.sendResponse(500, false, 'Request creation failed');
    }
    res.sendResponse(201, true, 'Request created successfully', request, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get All Requests
const getAllRequests = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const requests = await requestService.getAllRequests();
    if (requests.length === 0) {
        return res.sendResponse(200, true, 'No requests found', requests);
      }
    res.sendResponse(200, true, 'Requests fetched successfully', requests, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Request by ID
const getRequestById = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const request = await requestService.getRequestById(req.params.id);
    if (!request) {
      return res.sendResponse(404, false, `Request with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, 'Request fetched successfully', request, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Requests by User ID
const getRequestsByUserId = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const requests = await requestService.getRequestsByUserId(req.params.userId);
    if (requests.length === 0) {
      return res.sendResponse(200, true, `No requests found for user ID ${req.params.userId}`, requests);
    }
    res.sendResponse(200, true, 'Requests fetched successfully', requests, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Requests by Founder ID
const getRequestsByFounderId = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const requests = await requestService.getRequestsByFounderId(req.user.id);
    if (requests.length === 0) {
      return res.sendResponse(200, true, `No requests found for founder ID ${req.params.founderId}`, requests);
    }
    res.sendResponse(200, true, 'Requests fetched successfully', requests, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Response to Request (Accept or Reject)
const responseRequest = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const { status } = req.body;
    const request = await requestService.responseRequest(req.params.id, status);
    if (!request) {
      return res.sendResponse(404, false, `Request with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, `Request ${status} successfully`, request, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Delete Request
const deleteRequest = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const deletedRequest = await requestService.deleteRequest(req.params.id);
    if (!deletedRequest) {
      return res.sendResponse(404, false, `Request with ID ${req.params.id} not found for deletion`);
    }
    res.sendResponse(200, true, 'Request deleted successfully', deletedRequest, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  getRequestsByUserId,
  getRequestsByFounderId,
  responseRequest,
  deleteRequest,
};
