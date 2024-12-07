const express = require('express');
const { Program } = require('../proper_models'); 
const router = express.Router();

//get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Error fetching programs');
  }
});

//create a new program
router.post('/', async (req, res) => {
  try {
    const { programName, department, description } = req.body;
    const newProgram = await Program.create({ programName, department, description });
    res.status(201).json(newProgram);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).send('Error creating program');
  }
});

//update a program by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { programName, department, description } = req.body;
    const program = await Program.findByPk(id);
    if (!program) return res.status(404).send('Program not found');
    program.programName = programName;
    program.department = department;
    program.description = description;
    await program.save();
    res.status(200).json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).send('Error updating program');
  }
});

//delete a program by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);
    if (!program) return res.status(404).send('Program not found');
    await program.destroy();
    res.status(200).send('Program deleted');
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).send('Error deleting program');
  }
});

module.exports = router;
