// services/requestService.js
const Request = require('../models/requestModel');
const Startup = require('../models/startupModel');

// Create Request
const createRequest = async (requestData) => {
  const request = new Request(requestData);
  const savedRequest = await request.save();
  if (!savedRequest) {
    throw new Error('Request creation failed');
  }
  return savedRequest;
};

// Get All Requests
const getAllRequests = async () => {
  const requests = await Request.find().populate('userID startupID');
  if (!requests) {
    return [];
  }
  return requests;
};

// Get Request by ID
const getRequestById = async (id) => {
  const request = await Request.findById(id).populate('userID startupID');
  if (!request) {
    throw new Error(`Request with ID ${id} not found`);
  }
  return request;
};

// Get Requests by User ID
const getRequestsByUserId = async (userId) => {
  const requests = await Request.find({ userID: userId }).populate('startupID');
  if (!requests) {
    return [];
  }
  return requests;
};

// Get Requests by Startup ID
const getRequestsByStartupId = async (startupId) => {
  const requests = await Request.find({ startupID: startupId }).populate('userID');
  if (!requests) {
    return [];
  }
  return requests;
};

// Get Requests by Founder ID
const getRequestsByFounderId = async (founderId) => {
    const requests = await Request.find({ founderID: founderId }).populate('userID startupID');
    if (!requests) {
      return [];
    }
    return requests;
  };

// Response to Request (Update Request Status and Add User to Startup)
const responseRequest = async (requestId, status) => {
    // Find the request by ID
    const request = await Request.findById(requestId);
    if (!request) {
      throw new Error(`Request with ID ${requestId} not found for update`);
    }
  
    // Update the request status
    request.status = status;
    const updatedRequest = await request.save();
  
    // If the status is "Accepted", add the user to the startup's members
    if (status === 'Accepted') {
      const startup = await Startup.findById(request.startupID);
      if (!startup) {
        throw new Error(`Startup with ID ${request.startupID} not found`);
      }
  
      // Add user to the members array of the startup (avoiding duplicates)
      if (!startup.members.includes(request.userID)) {
        startup.members.push(request.userID);
        await startup.save();
      }
    }
  
    // Delete the request after it has been accepted or rejected
    await Request.findByIdAndDelete(requestId);
  
    return updatedRequest;
  };  

// Delete Request
const deleteRequest = async (id) => {
  const deletedRequest = await Request.findByIdAndDelete(id);
  if (!deletedRequest) {
    throw new Error(`Request with ID ${id} not found for deletion`);
  }
  return deletedRequest;
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  getRequestsByUserId,
  getRequestsByFounderId,
  getRequestsByStartupId,
  responseRequest,
  deleteRequest,
};
