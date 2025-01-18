import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputTags from "./InputTags";
import { REACT_APP_API_URL } from "../utils/config";

export default function DataGridComponent(props) {
  const [rowdata, setRowData] = useState([]);
  const [coldata, setColData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(REACT_APP_API_URL + "download/" + props.fileId, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const columns = Object.keys(result.data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
          editable: true,
        }));
        const rows = result.data.map((obj, index) => ({
          id: index + 1,
          ...obj,
        }));
        setColData(columns);
        setRowData(rows);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setLoading(false);
      },
    });
  }, [props.fileId]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{props.fileName}</Typography>
      </AccordionSummary>
      
      <div style={{margin: "1rem"}}>
        <InputTags fileId={props.fileId}></InputTags>
      </div>
      
      <AccordionDetails>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowdata}
            columns={coldata}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
