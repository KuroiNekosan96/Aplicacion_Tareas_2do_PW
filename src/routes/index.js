const express = require('express')
const router = express.Router();

const Task = require('../models/task')

router.get('/', async(req, res) => {

    res.render('index');
});
/*
router.post('/add', async(req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});
*/
//esto es nuevo
router.get('/about', (req, res) => {
    res.render('about');
});

//done
// router.get('/turn/:id', async(req, res) => {
//     const { id } = req.params;
//     const task = await Task.findById(id);
//     task.status = !task.status;
//     await task.save();
//     res.redirect('/')

// })

//editar
// router.get('/edit/:id', async(req, res) => {
//     const { id } = req.params;
//     const task = await Task.findById(id);
//     res.render('edit', {
//         task
//     });
// });

// router.post('/edit/:id', async(req, res) => {
//     const { id } = req.params;
//     await Task.update({ _id: id }, req.body);
//     res.redirect('/')
// })


//Para borrar
// router.get('/delete/:id', async(req, res) => {
//     const { id } = req.params;
//     await Task.remove({ _id: id });
//     res.redirect('/')
// });


module.exports = router;