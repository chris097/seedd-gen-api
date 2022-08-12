const Note = require('../model/note');

// Get => all projects
exports.getNotes = async (req, res, next) => {
    const note = await Note.find();
    res.json(note)
};

//Get => get project by ID
exports.getNoteById = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const note = await Note.findById(id)
        if(note === null) return res.status(404).json({message: "Note with this ID not found."})
        res.json(note)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// POST => Create a Note
exports.createNotes = async (req, res, next) => {
    const { title, tag, description } = req.body;
    try {
            const note = new Note({
                title: title,
                tag: tag,
                description: description
            })
        await note.save()
        res.status(201).json({message: "Note successfully created"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

// PUT => Update a Note
exports.updateNoteById = (req, res, next) => {
    const { id } = req.params;
    try {
         Note.findByIdAndUpdate(id, req.body).then(function () {
             Note.findOne({id: id}).then(function (note) {
                res.json(note)
            })
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Delete => delete a Note
exports.deleteNoteById = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);
        if(note === null) return res.status(404).json({message: "Note with this ID not found."})
        res.status(204).json({message: "Note successfully deleted."});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
