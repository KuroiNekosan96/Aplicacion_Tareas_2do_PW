const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Proyecto_PW', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log('Base de Datos conectada mijin'))
    .catch(err => console.log(err));