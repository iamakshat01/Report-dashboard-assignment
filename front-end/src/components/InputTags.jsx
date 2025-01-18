import { Cancel } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, useEffect } from "react";
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
        borderRadius: "50px"
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

export default function InputTags(props) {
  const [tags, setTags] = useState([]);
  const tagRef = useRef();

  useEffect(() => {
    const fetchFileData = async () => {
      const data = await fetch(REACT_APP_API_URL + "file/" + props.fileId);
      const result = await data.json();
      setTags(result.data.Tags);
    };
    fetchFileData();
  }, [props.fileId]);

  const updateTags = async (newTags) => {
    try {
      const response = await fetch(REACT_APP_API_URL + "file/" + props.fileId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: newTags,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleTagsDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    updateTags(newtags);
    setTags(newtags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(tagRef.current.value != "") {
      setTags([...tags, tagRef.current.value]);
      updateTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant="standard"
          size="small"
          sx={{ margin: "1rem 0" }}
          margin="none"
          placeholder={tags.length < 5 ? "Enter tags" : ""}
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleTagsDelete} key={index} />
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
