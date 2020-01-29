const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
//para autenticar al usuario 
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Plox escribir un titulo' });
    }
    if (!description) {
        errors.push({ text: 'Plox una descripcion my friend' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        //enlazo cada usuario  a sus notas por id
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Tarea añadida')
        res.redirect('/notes');
    }
});


//se encarga de consultar los datos de la base
router.get('/notes', isAuthenticated, async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('notes/all-notes', { notes });
});

//Para editar los jugadores
router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', { note });
    // const { id } = req.params;
    // const task = await Task.findById(id);
    // res.render('edit', {
    //     task
    // });
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Tarea actualizada');
    res.redirect('/notes');
});

//para eliminar
router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Tarea Eliminada');
    res.redirect('/notes');
});
module.exports = router;