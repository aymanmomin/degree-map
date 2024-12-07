const express = require('express');
const { Instructor } = require('../proper_models'); 
const router = express.Router();

//create new instructor
router.post('/', async (req, res) => {
  try {
    const { name, department, email, phone } = req.body;
    const newInstructor = await Instructor.create({ name, department, email, phone });
    res.status(201).json(newInstructor);
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).send('Error creating instructor');
  }
});

//get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    res.status(200).json(instructors);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).send('Error fetching instructors');
  }
});

//update an instructor by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email, phone } = req.body;
    const instructor = await Instructor.findByPk(id);
    if (!instructor) return res.status(404).send('Instructor not found');
    instructor.name = name;
    instructor.department = department;
    instructor.email = email;
    instructor.phone = phone;
    await instructor.save();
    res.status(200).json(instructor);
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).send('Error updating instructor');
  }
});

//delete an instructor by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);
    if (!instructor) return res.status(404).send('Instructor not found');
    await instructor.destroy();
    res.status(200).send('Instructor deleted');
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).send('Error deleting instructor');
  }
});

module.exports = router;
