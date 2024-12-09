import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/courses'; //backend URL

//get all courses
export const getAllCourses = async () => {
  try {
    const response = await axios.get(BASE_URL);//get request at courses url to  get all 
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

//create a new course
export const createCourse = async (courseData) => {
  try {
    console.log(courseData);
    const response = await axios.post(BASE_URL, courseData); //post request to create new course
    console.log('response add code',response);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

//update a course
export const updateCourse = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);//put requet for updating a course
    console.log('response update code',response);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

//delete a course
export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);//deletion request
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};
