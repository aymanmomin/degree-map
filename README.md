# DegreeMap  

**Introduction**  
DegreeMap is a project developed for **CPSC 471 UCalgary Course** by **Group 22** under the guidance of a our TA: *Josiah Lansang*. It is a comprehensive platform designed to streamline academic planning and degree management for students. This project represents the collaborative efforts of three team members, showcasing the integration of modern frontend and backend technologies using `ReactJs` and `SQLite3`.

## Team Members  

- **[Ayman M](https://github.com/aymanmomin)**
- **[Christian N](https://github.com/sukh-lgtm)**
- **[Sukhnaaz S](https://github.com/ChristianN517)**



---

## Current Codebase Overview  
The `main` branch contains only the frontend code without any backend data linking. To access the complete backend functionality, switch to the `BackendIntegration` branch and follow the instructions below. 

---

## Setup

Clone the **GitHub Repository** using the command below in your a blank folder.

```bash
git clone https://github.com/aymanmomin/degree-map.git
```


## Frontend Setup  
1. **Install Dependencies:**  
   Before starting the frontend server, run:  
   ```bash
   npm install
   ```  

2. **Start the Frontend:**  
   Once dependencies are installed, start the frontend server by running:  
   ```bash
   npm start
   ```

---

## Backend Setup (Branch: `BackendIntegration`)  
1. **Switch to the Backend Integration Branch:**  
   Ensure you are on the `BackendIntegration` branch by running:  
   ```bash
   git checkout BackendIntegration
   ```  

2. **Navigate to the Backend Directory:**  
   ```bash
   cd src/nodeBackend
   ```  

3. **Run the Backend Server:**  
   Start the backend by running:  
   ```bash
   node server.js
   ```  
   This will create and seed the database, generating a `database.sqlite` file for use.  

**Note:** The backend has been successfully tested on the following configurations:  
- **Node.js**: v20.13.1  
- **Operating System**: Ubuntu 22.04.4 LTS
- **Does not support Windows system.**
