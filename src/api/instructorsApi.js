import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/instructors'; // backend URL

//get all instructors
export const getAllInstructors = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching instructors:', error);
    throw error;
  }
};

//create a new instructor
export const createInstructor = async (instructorData) => {
  try {
    const response = await axios.post(BASE_URL, instructorData);
    return response.data;
  } catch (error) {
    console.error('Error creating instructor:', error);
    throw error;
  }
};

//update an instructor
export const updateInstructor = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating instructor:', error);
    throw error;
  }
};

//delete an instructor
export const deleteInstructor = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting instructor:', error);
    throw error;
  }
};