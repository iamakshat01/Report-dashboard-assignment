import { Cancel } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, useEffect, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { REACT_APP_API_URL } from "../utils/config";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#1976d2",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0.3rem 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
        borderRadius: "50px",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function SearchTags() {
  const [tags, setTags] = useState([]);
  const { handleDisplayFileDataChange } = useContext(DashboardContext);
  const tagRef = useRef();

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        if (tags.length !== 0) {
          const buildUrlWithTags = (tags) => {
            const queryString = tags
              .map((tag) => `tags=${encodeURIComponent(tag)}`)
              .join("&");
            return `${REACT_APP_API_URL + "allFilesWithTag"}?${queryString}`;
          };

          const url = buildUrlWithTags(tags);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const result = await response.json();
          handleDisplayFileDataChange(result.data);
        }
      } catch (error) {
        console.error("Error fetching file data:", error);
        handleDisplayFileDataChange([]); // Set empty array on error
      }
    };
    fetchFileData();
  }, [tags]);

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    if (newtags.length == 0) {
      const fetchFileData = async () => {
        try {
          const response = await fetch(REACT_APP_API_URL + "allFiles");
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const result = await response.json();
          handleDisplayFileDataChange(result.data);
        } catch (error) {
          console.error("Error fetching file data:", error);
          handleDisplayFileDataChange([]); // Set empty array on error
        }
      };
      fetchFileData();
    }
    setTags(newtags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (tagRef.current.value != "") {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ marginBottom: "1rem" }}>Search by Tags</Typography>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant="standard"
          size="small"
          margin="none"
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
      </form>
    </Box>
  );
}
