import { useState, useContext } from "react";
import {
  Button,
  Typography,
  Box,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { REACT_APP_API_URL } from "../utils/config";
import { DashboardContext } from "../context/DashboardContext";

export default function FileUpload() {
  const { handleAllFileDataChange, handleDisplayFileDataChange, handleSelectNodeId} = useContext(DashboardContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [directoryPath, setDirectoryPath] = useState("/");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDirectoryPathChange = (event) => {
    setDirectoryPath(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    if (!directoryPath) {
      setError("Please specify a directory path.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const fullDirectoryPath = "root" + directoryPath;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("directoryPath", directoryPath);

    try {
      const response = await fetch(REACT_APP_API_URL + "upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const responseAll = await fetch(REACT_APP_API_URL + "allFiles", {
        method: "GET"
      });

      const result = await responseAll.json();
      handleDisplayFileDataChange(result.data)
      handleAllFileDataChange(result.data)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setDirectoryPath(""); // Clear directory path after upload
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setDirectoryPath("/"); // Reset to default Linux directory path
    setUploadProgress(0);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Typography sx={{ marginBottom: "1rem" }}>File Upload</Typography>

      <Stack spacing={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={isUploading}
        >
          Select File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </Button>

        {selectedFile && (
          <Box>
            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
              Selected File:
            </Typography>
            <Typography variant="body2">{selectedFile.name}</Typography>
          </Box>
        )}

        <TextField
          label="Directory Path"
          variant="outlined"
          value={directoryPath}
          onChange={handleDirectoryPathChange}
          fullWidth
          size="small"
          disabled={isUploading}
        />

        {isUploading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: "1rem" }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || !directoryPath}
          >
            Upload
          </Button>
          {selectedFile && !isUploading && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFile}
              sx={{ marginTop: "1rem" }}
            >
              Clear File
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
