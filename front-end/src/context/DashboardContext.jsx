import React, { useState, useEffect, createContext } from "react";
import { REACT_APP_API_URL } from "../utils/config";

export const DashboardContext = createContext();

export const DashboardContextProvider = (props) => {
  const [selectedNodeId, setSelectedNodeId] = useState("root");
  const [allFileData, setAllFileData] = useState([]);
  const [displayFileData, setDisplayFileData] = useState([]);
  
  useEffect(() => {
    const fetchFileData = async () => {
      const data = await fetch(REACT_APP_API_URL+'allFiles');
      const result = await data.json();
      setDisplayFileData(result.data);
      setAllFileData(result.data)
    };
    fetchFileData();
  }, []);

  const handleDisplayFileDataChange = (fileDataReceived) => {
    setDisplayFileData(fileDataReceived);
  };

  const handleAllFileDataChange = (fileDataReceived) => {
    setAllFileData(fileDataReceived);
  };


  const handleSelectNodeId = (nodeId) => {
    console.log(selectedNodeId);
    setSelectedNodeId(nodeId);
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedNodeId,
        handleSelectNodeId,
        displayFileData,
        handleDisplayFileDataChange,
        allFileData,
        handleAllFileDataChange
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};
