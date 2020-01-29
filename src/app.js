const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');

//inicializando
const app = express();
require('./database');
require('./config/passport');


//conecta base de datos
// mongoose.connect('mongodb://localhost/crud-mongo')
//     .then(db => console.log('DB conectada'))
//     .catch(err => console.log(err))

//importing routes
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    //de que manera se va utilizar las vistas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//formularios puedan enviar otro tipo de métodos
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//para logeo
app.use(passport.initialize());
app.use(passport.session());
//para mensajes
app.use(flash());


//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//routes
app.use('/', indexRoutes);
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//app.use('/notes', notesRoutes);
//app.use('/users', userRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//servidor
app.listen(app.get('port'), () => {
    console.log(`Puerto en ${app.get('port')} `);
});