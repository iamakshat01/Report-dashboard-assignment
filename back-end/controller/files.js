const { transformData } = require("../utils")
const db = require("../models");

const fileUploadHandler = async (req, res, next) => {
  try {
    const { filename, originalname } = req.file;
    const { directoryPath } = req.body;

    const fileData = await db.File.create({
      Name: filename,
      OriginalName: originalname,
      OriginalPath: directoryPath + '/' + originalname,
    });

    res.status(200).json({
      message: "File upload successful",
      data: fileData
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const fileDownloadHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fileRecord = await db.File.findById(id);
    const filePath = process.env.DIR + "\\" + fileRecord.Name;
    // Send the file for download
    res.download(filePath, fileRecord.Name, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Error downloading the file" });
      }
    });
  } catch (error) {
    console.error("Error in file download handler:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const fileGetHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fileRecord = await db.File.findById(id);
    res.status(200).json({
      message: "File found",
      data: fileRecord,
    });
  } catch (error) {
    console.error("Error in file get handler:", error);
    res.status(404).json({ error: "File not found" });
  }
};

const allFileGetHandler = async (req, res, next) => {
  try {
    const fileRecords = await db.File.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "File found",
      data: transformData(fileRecords),
    });
  } catch (error) {
    console.error("Error in file get handler:", error);
    res.status(404).json({ error: "File not found" });
  }
};

const postTagsForFileHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags)) {
      return res
        .status(400)
        .json({ error: "Tags must be provided as an array" });
    }

    const updatedFile = await db.File.findByIdAndUpdate(
      id,
      { $set: { Tags: tags } },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tags updated successfully",
      data: updatedFile,
    });
  } catch (error) {
    console.error("Error updating file tags:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFilesWithTagHandler = async (req, res, next) => {
  try {
    const { tags } = req.query;

    let files;
    if (!tags) {
      // If tags are empty, retrieve all files
      files = await db.File.find({});
    } else {
      // Parse tags and find files matching the specified tags
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      files = await db.File.find({ Tags: { $in: tagArray } });
    }

    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found with the specified tags" });
    }

    res.status(200).json({
      success: true,
      data: transformData(files),
    });
  } catch (error) {
    console.error("Error retrieving files by tags:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFilesWithDateHandler = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }
    const searchDate = new Date(date);
    if (isNaN(searchDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    // Find files created on the specified date
    const files = await db.File.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found for the specified date" });
    }

    res.status(200).json({
      success: true,
      data: transformData(files)
    });
  } catch (error) {
    console.error("Error retrieving files by date:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  fileUploadHandler,
  fileDownloadHandler,
  fileGetHandler,
  allFileGetHandler,
  postTagsForFileHandler,
  getFilesWithTagHandler,
  getFilesWithDateHandler
};
