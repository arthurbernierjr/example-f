require('dotenv').config()
console.log(process.env.MONGO_URI)
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const Fruit = require('./models/fruits'); // importing fruits from wherever it is


// MVC SETUP
//views
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
//models
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// MIDDLEWARE 
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.body)
    next()
})
app.use(methodOverride('_method'))

//INDEX week10day3 changed on 11day2
app.get('/fruits', (req, res) => {
    Fruit.find({}, (err, foundFruits) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.render('fruits/Index', {
                fruits: foundFruits
            })
        }
    })

});

//NEW week 11day01
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})


//DELETE
app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
        if(!err){
            res.redirect('/fruits')
        } else {
            res.status(400).send(err)
        }
    })
})

//UPDATE
app.put('/fruits/:id', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else {
        req.body.readyToEat = false;
    }

    Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.redirect(`/fruits/${req.params.id}`)
        }
    })
})


//CREATE week 11 day 1 updated week 11 day 2

app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    Fruit.create(req.body, (err, createdFruit) => {
        if (err) {
            res.status(403).send(err)
        } else {
            console.log(createdFruit)
            res.redirect('/fruits')
        }
    })

})


//EDIT
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.render('fruits/Edit', {
                fruit: foundFruit
            })
        }
    })
})

//SHOW week10day3 updated on week11day2

app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.render('fruits/Show', {
                fruit: foundFruit
            })
        }
    })
})


app.listen(3000, () => {
    console.log('If your reading this Im still listening');
})