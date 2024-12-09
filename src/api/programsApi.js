import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/programs'; //backend URL

//get all programs
export const getAllPrograms = async () => {
  try {
    const response = await axios.get(BASE_URL);//get request at program url to  get all 
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

//create a new program
export const createProgram = async (programData) => {
  try {
    const response = await axios.post(BASE_URL, programData);//post request to create newrprogram
    return response.data;
  } catch (error) {
    console.error('Error creating program:', error);
    throw error;
  }
};

//update a program
export const updateProgram = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);//put requet for updating a program
    return response.data;
  } catch (error) {
    console.error('Error updating program:', error);
    throw error;
  }
};

//delete a program
export const deleteProgram = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting program:', error);
    throw error;
  }
};
