import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/departments'; // backend URL

//get all Departments
export const getAllDepartments = async () => {
  try {
    const response = await axios.get(BASE_URL);//get request at departments url to  get all 
    console.log("Department Data", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Departments:', error);
    throw error;
  }
};

