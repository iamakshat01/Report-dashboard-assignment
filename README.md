# Dynamic Report Dashboard Interface

## Project Demo

Demo Recording: [View Demo](https://drive.google.com/file/d/17p8XLPGiOJJUPjFdQg89IKMvAAk3Z5ka/view?usp=sharing)

## Project Overview

The **Dynamic Report Dashboard Interface** is a web application designed to manage and display various CSV reports efficiently. The dashboard allows users to dynamically load CSV files, group reports based on user-created tags or dates, and view them in an organized, user-friendly grid format.

## Features

- **Dynamic CSV Loading**: Automatically load CSV files from the specified folder structure and display them within tabs.
- **Grid View**: Display CSV contents in a structured, paginated, and sortable table format.
- **Grouping and Filtering**: Group reports by date and tags, with expandable and collapsible sections for better organization.
- **File Upload Mechanism**: Dynamically upload new CSV files to the dashboard.
- **Expand/Collapse Functionality**: Grouped reports can be expanded or collapsed to keep the UI clean.

## Technical Specifications

- **Frontend Framework**: React.js with Material-UI
- **Backend Framework**: Node.js with Express.js and MongoDB

---

# Getting Started with the Dynamic Report Dashboard Interface

## Starting the Backend

### Steps:

1. Create a `.env` file with the following variables:
   - **Sample .env file**: [Download Sample](https://drive.google.com/file/d/1ZCVXuYhHgODlSyHeindlVzLTB1d6w7K3/view?usp=sharing)
     ```
     DB_SERVER=<DB_URL>
     PORT=<PORT>
     DIR=<Directory where to store CSV Files>
     DELIMITER=<Use \\ if on Windows or / if on Linux>
     ```


2. Run the following commands in the backend directory:
   ```bash
   cd back-end
   npm install
   npm start
   
The server will start at: `http://localhost:<PORT>`

## Starting the Frontend

### Steps:

1. Update the `config.js` file:
   - Set `REACT_APP_API_URL` to point to the backend server, e.g., `http://localhost:4000/api/`.

2. Run the following commands in the frontend directory:
   ```bash
   cd front-end
   npm install
   npm run dev
