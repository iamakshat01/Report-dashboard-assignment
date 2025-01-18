import React, { useState, useEffect, useContext } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {
  Folder,
  InsertDriveFile,
} from "@mui/icons-material";
import { DashboardContext } from "../context/DashboardContext";

const FileExplorer = () => {
  const { selectedNodeId, handleSelectNodeId, allFileData} = useContext(DashboardContext);

  const handleDirectorySelect = (event, nodeId) => {
    handleSelectNodeId(nodeId);
  }
  
  const renderTree = (nodes) => {
    if (!nodes.id) {
      nodes.id = `generated-id-${nodes.name}`;
    }

    return (
      <TreeItem
        key={nodes.id}
        itemId={nodes.id}
        label={nodes.name}
        icon={nodes.isFile ? <InsertDriveFile /> : <Folder />}
        sx={{ textAlign: 'left' }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((child) => renderTree(child))
          : null}
      </TreeItem>
    );
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <SimpleTreeView
        aria-label="file system navigator"
        selected={selectedNodeId}
        onItemClick={handleDirectorySelect}
      >
        {renderTree(allFileData)}
      </SimpleTreeView>
    </div>
  );
};

export default FileExplorer;
