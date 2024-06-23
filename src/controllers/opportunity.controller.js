// src/controllers/opportunityController.js

const dbCollectionNames = require("../constants/dbCollection.constant");
const Opportunity = require("../models/opportunity.model");
const UserOpportunity = require("../models/user_opportunity.model");
const { toObjectId } = require("../utils/dbHelper.util");


/**
 * Apply for an opportunity
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Application status message
 * @author hari prasad joshi
 **/
const applyOpportunity = async (req, res) => {
  const { opportunityId } = req.params;
  const userId = req.user?._id;
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  try {
    // Check if the opportunity exists
    const opportunity = await Opportunity.findById(toObjectId(opportunityId));
    if (!opportunity) {
      return res
        .status(404)
        .json({ success: false, message: "Opportunity not found" });
    }

    // Check if the user has already applied
    const existingApplication = await UserOpportunity.findOne({
      userId: toObjectId(userId),
      opportunityId: toObjectId(opportunityId),
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already applied for this opportunity",
        });
    }

    // Create a new application
    const newApplication = new UserOpportunity({
      userId: toObjectId(userId),
      opportunityId: toObjectId(opportunityId),
      status: "applied",
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicationId: newApplication._id,
        opportunityTitle: opportunity.title,
        appliedAt: newApplication.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in applyOpportunity:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

/**
 * Get opportunities
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Opportunities list
 * @author hari prasad joshi
 **/
const getOpportunities = async (req, res) => {
  try {
    let { searchString, sortBy, sortOrder, page, limit, isApplied } = req.query;
    const userId = req.user?._id;

    const sanitizedPage = Math.max(1, parseInt(page) || 1);
    const sanitizedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
    const skip = (sanitizedPage - 1) * sanitizedLimit;
    isApplied = isApplied === "true" ? true : false;

    const pipeline = [];

    // Match stage
    const matchStage = {};
    if (searchString) {
      matchStage.$or = [
        { title: { $regex: searchString, $options: "i" } },
        { company_name: { $regex: searchString, $options: "i" } },
        { profile_name: { $regex: searchString, $options: "i" } },
      ];
    }
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    if (userId) {
      // Lookup stage
      pipeline.push({
        $lookup: {
          from: dbCollectionNames.USER_OPPORTUNITY,
          let: { oppId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$opportunityId", "$$oppId"] },
                    { $eq: ["$userId", toObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "userApplication",
        },
      });
    } else {
      pipeline.push({
        $addFields: {
          userApplication: [],
        },
      });
    }

    // Add application status
    pipeline.push({
      $addFields: {
        applicationStatus: {
          $cond: {
            if: { $gt: [{ $size: "$userApplication" }, 0] },
            then: { $arrayElemAt: ["$userApplication.status", 0] },
            else: "not_applied",
          },
        },
      },
    });

    // Filter by application status if isApplied is provided
    if (isApplied) {
      pipeline.push({
        $match: {
          applicationStatus: isApplied ? "applied" : "not_applied",
        },
      });
    }

    // Sorting
    const sortStage = {};
    if (sortBy && sortOrder) {
      sortStage[sortBy] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
    } else {
      sortStage.createdAt = -1; // Default sorting
    }

    // Facet stage
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: sanitizedLimit },
        ],
      },
    });

    const result = await Opportunity.aggregate(pipeline);

    const opportunities = result[0].data;
    const totalCount = result[0].metadata[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: opportunities,
      pagination: {
        currentPage: sanitizedPage,
        totalPages: Math.ceil(totalCount / sanitizedLimit),
        totalCount,
        dataInThisPage: opportunities.length,
        hasNextPage: skip + opportunities.length < totalCount,
        hasPrevPage: sanitizedPage > 1,
      },
    });
  } catch (err) {
    console.error("Error in getOpportunities:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  applyOpportunity,
  getOpportunities,
};
