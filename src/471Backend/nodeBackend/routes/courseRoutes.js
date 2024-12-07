const express = require('express');
const { Course } = require('../proper_models'); 
const router = express.Router();

//get all courses
router.get('/', async (req, res) => {
  try {
    console.log(Course);
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

//get a course by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).send('Course not found');
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send('Error fetching course');
  }
});

//create a new course
router.post('/', async (req, res) => {
  try {
    const { courseCode, departmentCode, courseNumber, courseTitle, courseDescription, courseKeywords  } = req.body;
    const newCourse = await Course.create({
      courseCode,
      departmentCode,
      courseNumber,
      courseTitle,
      courseDescription,
      courseKeywords,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Error creating course');
  }
});

//update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { courseCode, departmentCode, courseNumber, courseTitle, courseDescription, courseKeywords  } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).send('Course not found');
    course.courseCode = courseCode;
    course.departmentCode = departmentCode;
    course.courseNumber = courseNumber;
    course.courseTitle = courseTitle;
    course.courseDescription = courseDescription;
    course.courseKeywords = courseKeywords;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send('Error updating course');
  }
});

//delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).send('Course not found');
    await course.destroy();
    res.status(200).send('Course deleted');
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send('Error deleting course');
  }
});

module.exports = router;
