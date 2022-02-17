require('dotenv').config()
const express = require('express');
const app = express();
const fruits = require('./models/fruits'); // importing fruits from wherever it is
const reactViews = require('express-react-views')
const createEngine = reactViews.createEngine
const renderFile = createEngine()


app.set('view engine', 'jsx');
app.engine('jsx', renderFile);

// MIDDLEWARE 
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

//INDEX week10day3
app.get('/fruits', (req, res) => {
    res.render('fruits/Index', { fruits })
});

//NEW week 11day01
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})


//DELETE

//UPDATE

//CREATE week 11 day 1

app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits');
})


//EDIT

//SHOW week10day3

app.get('/fruits/:indexOfFruitsArray', (req, res) => {
   res.render('fruits/Show', {
       fruit: fruits[req.params.indexOfFruitsArray]
   })
})


app.listen(3000, () => {
    console.log('If your reading this Im still listening');
})