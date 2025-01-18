const router = require("express").Router();
const multer = require("multer");
const {
  fileUploadHandler,
  fileDownloadHandler,
  fileGetHandler,
  allFileGetHandler,
  postTagsForFileHandler,
  getFilesWithTagHandler,
  getFilesWithDateHandler
} = require("../controller/index.js");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/api/upload", upload.single("file"), fileUploadHandler);
router.get("/api/download/:id", fileDownloadHandler);
router.get("/api/file/:id", fileGetHandler);
router.post("/api/file/:id", postTagsForFileHandler);
router.get("/api/allFilesWithTag", getFilesWithTagHandler);
router.get("/api/allFilesWithDate", getFilesWithDateHandler);
router.get("/api/allFiles", allFileGetHandler);

module.exports = router;
