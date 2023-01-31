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


router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const petPost = new Pets(body)
        await petPost.save()
        // await Pets.create(body)

        console.log('Pet was created!', petPost)
        res.redirect('/pets')
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {
        const petbyid = await Pets.findOne({ _id: id })
        console.log(petbyid)

        res.render('details', {
            pet: petbyid,
            error: false
        })
    }
    catch (error) {
        console.log(error)
        res.render('details', {
            error: true,
            message: 'No able to show that id'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const petRem = await Pets.findByIdAndDelete({ _id: id })
        if (petRem) {
            res.json({
                status: true,
                message: 'deleted'
            })
        } else {

            res.json({
                status: false,
                message: 'Not able to delete'
            })
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const modPet = await Pets.findByIdAndUpdate(id, body, { useFindAndModify: false })

        if (modPet) {
            res.json({
                status: true,
                message: 'updated'
            })
        } else {

            res.json({
                status: false,
                message: 'Not able to update'
            })
        }
        console.log(modPet);

    } catch (error) {

        console.log(error)
    }
})

module.exports = router;    