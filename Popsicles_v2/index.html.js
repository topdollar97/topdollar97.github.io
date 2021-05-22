const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Names = require('./models/names');


mongoose.connect('mongodb://localhost:27017/popsicles', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.get('/', async(req,res)=>{
    const names = await Names.find({})
    res.render('pages/homepage', {names})
});
app.get('/addNames', (req,res)=>{
    res.render('pages/addNames')
});
app.get('/randomName', async(req,res)=>{
    // const randName = await Names.aggregate([{$sample:{size:1}}]);
    const names = await Names.find({});
    // console.log(names);
    let count = 0;
    let length = 0;
    let randName = ''
    for( let name in names){
        length ++
    }
    // console.log(length)
    let randNum = Math.floor(Math.random()*length) +1
    randName = names[randNum];
    // console.log(randName)
    // console.log(randNum)
    // for (let name in names){
    //     console.log(name);
    //     count ++;
    //     if(count === randNum){
    //         randName = name
    //         console.log('true')
    //     }
    // }
    randName = randName.name
    // console.log(randName);
    res.render('pages/randomName', {randName, names})



    //  <% for (let name of names) {%> 
    //     <% if name ===randName{%> 
    //         <% let id=name.id %> 
    // <% } %> 
});

app.delete('/:id', async (req,res) =>{
    const {id} = req.params;
    const deletedProduct = await Names.findByIdAndDelete(id);
    res.redirect('/');
})


app.post('/addNames', async (req,res)=>{
    const newNames = new Names(req.body);
    await newNames.save();
    res.redirect('/')
});
app.listen(3000, () =>{
    console.log('APP IS LISTENING ON PORT 3000!');
});