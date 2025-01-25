
import express from 'express'
import fetchuser from '../middleware/fetchuser.js';
import { body, validationResult } from 'express-validator'
import Note from '../models/Note.js';
const notesRouter = express.Router();



// ROUTE 1 : Get all notes using GET : "api/notes/getallnotes". Login required 
notesRouter.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})


// ROUTE 2 : Add a note  using POST : "api/notes/addnote". Login required 
notesRouter.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 5 }),        // Here we are defining validators for user by express validator
    body('description', "Description must be atleast 3 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        //If ther are errors , return Bad requrst and the errors
        const errors = validationResult(req);  // verify the result of validation
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Destructuring from req.body
        const { title, description, tag } = req.body;

        // Creating a new note 
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // Saving new note
        const savedNote = await note.save();

        // Sending new note as response
        res.json(savedNote)

        // This catch block to handlle unfortunate errors
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})


// ROUTE 3 : Update a existing note  using PUT : "api/notes/updatenote". Login required 
notesRouter.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        // Destructuring details from req.body
        const { title, description, tag } = req.body;

        // Creating new note which is empty
        const newNote = {}

        // Putting all the updated values in newNote
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }


        // Find the note and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })




        // This catch block to handlle unfortunate errors
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})



// ROUTE 4 : Delete a existing note  using DELETE : "api/notes/deletenote". Login required 
notesRouter.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Finding the note delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };


        // Verifying user of the note and user of the request are same or not 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // Finding the note and deleting it
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })


        // This catch block to handlle unfortunate errors
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})


export default notesRouter
