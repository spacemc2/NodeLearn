const express = require('express');
const router = express.Router();

const Pets = require('../models/test')

router.get('/', async (req, res) => {

    try {

        const arrayPets = await Pets.find();

        res.render('pets', {
            arrayPets: arrayPets
        })
    }
    catch (error) {
        console.log(error)
    }



})


router.get('/create',(req,res)=>{
    res.render('create')
})

router.post('/',async (req,res)=>{
    const body = req.body
    try{
        const petPost = new Pets(body)
        await petPost.save()
        // await Pets.create(body)

        console.log('Pet was created!',petPost)
        res.redirect('/pets')
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;    