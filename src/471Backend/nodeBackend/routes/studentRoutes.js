const express = require('express');
const { Student } = require('../proper_models'); 
const router = express.Router();

//get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students');
  }
});

//get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send('Student not found');
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).send('Error fetching student');
  }
});

//create a new student
router.post('/', async (req, res) => {
  try {
    const { name, email, programId } = req.body;
    const newStudent = await Student.create({ name, email, programId });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).send('Error creating student');
  }
});

//update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, programId } = req.body;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send('Student not found');
    student.name = name;
    student.email = email;
    student.programId = programId;
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Error updating student');
  }
});

//delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send('Student not found');
    await student.destroy();
    res.status(200).send('Student deleted');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Error deleting student');
  }
});

module.exports = router;
