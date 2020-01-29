const express = require('express')
const router = express.Router();
const User = require('../models/User')
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

//añadir usuario
router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Por favor inserta tu nombre wey' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'No se parecen ingrese bien' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Debe tener mas de 4 we' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        //para ver si existe el email ingresado
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email esta en uso');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Te has registrado');
        res.redirect('/users/signin');
    }
});

//para cerrar session 
router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
//2:15:48----del video