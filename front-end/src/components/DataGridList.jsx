import React, { useEffect, useContext, useState } from "react";
import DataGridComponent from "./DataGrid";
import { DashboardContext } from "../context/DashboardContext";

function findFilesUnderNode(nodeId, displayFileData) {
  const result = [];

  function traverse(currentNode) {
    if (currentNode.id === nodeId) {
      // Collect all files under this node
      collectFiles(currentNode);
      return true;
    }
    if (currentNode.children && Array.isArray(currentNode.children)) {
      for (const child of currentNode.children) {
        if (traverse(child)) return true;
      }
    }
    return false;
  }

  function collectFiles(currentNode) {
    if (currentNode.isFile) {
      result.push({
        id: currentNode.id,
        name: currentNode.name,
        location: currentNode.location,
      });
    }
    if (currentNode.children && Array.isArray(currentNode.children)) {
      for (const child of currentNode.children) {
        collectFiles(child);
      }
    }
  }

  traverse(displayFileData);
  return result;
}

export default function DataGridList() {
  const { selectedNodeId, displayFileData } = useContext(DashboardContext);
  const [filesList, setFiles] = useState([]);

  useEffect(() => {
    if (selectedNodeId && displayFileData) {
      const fetchedFiles = findFilesUnderNode(selectedNodeId, displayFileData);
      setFiles(fetchedFiles);
    }
  }, [selectedNodeId, displayFileData]);

  return (
    <div>
      {filesList.length > 0 ? (
        filesList.map((file, index) => (
          <DataGridComponent
            key={index}
            fileId={file.id}
            fileName={file.name}
            fileLocation={file.location}
          />
        ))
      ) : (
        <p>No file found</p>
      )}
    </div>
  );
}
