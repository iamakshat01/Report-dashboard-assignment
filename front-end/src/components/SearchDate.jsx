import { TextField, Typography, Box, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { REACT_APP_API_URL } from "../utils/config";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function SearchByDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { handleDisplayFileDataChange } = useContext(DashboardContext);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        if (selectedDate) {
          const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
          const url = `${
            REACT_APP_API_URL + "allFilesWithDate"
          }?date=${formattedDate}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const result = await response.json();
          handleDisplayFileDataChange(result.data);
        }
      } catch (error) {
        console.error("Error fetching file data:", error);
        handleDisplayFileDataChange([]);
      }
    };

    fetchFileData();
  }, [selectedDate]);

  const handleClearDate = () => {
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
        handleDisplayFileDataChange([]);
      }
    };
    fetchFileData();
    setSelectedDate(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ marginBottom: "1rem" }}>Search by Date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select a date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} fullWidth variant="standard" size="small" />
          )}
        />
      </LocalizationProvider>
      {selectedDate && (
        <Box sx={{ marginTop: "1rem" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearDate}
          >
            Clear Date
          </Button>
        </Box>
      )}
    </Box>
  );
}
