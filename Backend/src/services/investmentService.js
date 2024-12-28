// services/investmentService.js
const Investment = require('../models/investmentModel');

// Create Investment
const createInvestment = async (investmentData) => {
    const investment = new Investment(investmentData);
    const savedInvestment = await investment.save();
    if (!savedInvestment) {
        throw new Error('Investment creation failed');
    }
    return savedInvestment;
};

// Get All Investments
const getAllInvestments = async () => {
    const investments = await Investment.find().populate('userID', 'name').populate('startupID', 'name');
    if (!investments) {
        throw new Error('No investments found');
    }
    return investments;
};

// Get Investment by ID
const getInvestmentById = async (id) => {
    const investment = await Investment.findById(id).populate('userID', 'name').populate('startupID', 'name');
    if (!investment) {
        throw new Error(`Investment with ID ${id} not found`);
    }
    return investment;
};

// Get Investments by User ID
const getInvestmentsByUserId = async (userId) => {
    const investments = await Investment.find({ userID: userId }).populate('userID', 'name').populate('startupID', 'name');
    if (!investments) {
        throw new Error(`No investments found for user with ID ${userId}`);
    }
    return investments;
};

// Get Investments by Startup ID
const getInvestmentsByStartupId = async (startupId) => {
    const investments = await Investment.find({ startupID: startupId }).populate('userID', 'name').populate('startupID', 'name');
    if (!investments) {
        throw new Error(`No investments found for startup with ID ${startupId}`);
    }
    return investments;
};

// Update Investment
const updateInvestment = async (id, updateData) => {
    const updatedInvestment = await Investment.findByIdAndUpdate(id, updateData, { new: true }).populate('userID', 'name').populate('startupID', 'name');
    if (!updatedInvestment) {
        throw new Error(`Investment with ID ${id} not found for update`);
    }
    return updatedInvestment;
};

// Delete Investment
const deleteInvestment = async (id) => {
    const deletedInvestment = await Investment.findByIdAndDelete(id);
    if (!deletedInvestment) {
        throw new Error(`Investment with ID ${id} not found for deletion`);
    }
    return deletedInvestment;
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