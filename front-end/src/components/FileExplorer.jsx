import React, { useState, useEffect, useContext } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Folder, InsertDriveFile } from "@mui/icons-material";
import { DashboardContext } from "../context/DashboardContext";
import Tooltip from "@mui/material/Tooltip";

const FileExplorer = () => {
  const { selectedNodeId, handleSelectNodeId, allFileData } =
    useContext(DashboardContext);

  const handleDirectorySelect = (event, nodeId) => {
    handleSelectNodeId(nodeId);
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length > maxLength) {
      return `${name.slice(0, maxLength)}...`;
    }
    return name;
  };

  const maxLength = 15;
  

  const renderTree = (nodes) => {
    if (nodes.id) {
      const isTruncated = nodes.name.length > maxLength;
      const truncatedName = truncateFileName(nodes.name, maxLength);
      const label = isTruncated ? (
        <Tooltip title={nodes.name} placement="top">
          <span>{truncatedName}</span>
        </Tooltip>
      ) : (
        <span>{nodes.name}</span>
      );
      return (
        <TreeItem
          key={nodes.id}
          itemId={nodes.id}
          label={label}
          icon={nodes.isFile ? <InsertDriveFile /> : <Folder />}
          sx={{ textAlign: "left" }}
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((child) => renderTree(child))
            : null}
        </TreeItem>
      );
    }
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
