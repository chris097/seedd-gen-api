const express = require('express');
const { getNotes, createNotes, getNoteById, deleteNoteById, updateNoteById } = require('../controller/note');
const router = express.Router();

// crud operation
router.get('/notes', getNotes)
router.get('/note/:id', getNoteById)
router.post('/notes', createNotes);
router.put('/note/:id', updateNoteById);
router.delete('/note/:id', deleteNoteById);

module.exports = router;