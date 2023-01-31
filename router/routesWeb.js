const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { description: 'Dinamic description' })
})


router.get('/service', (req, res) => {

    res.render('service', {
        main: 'we provide the main service',
        secondary: 'this is the secondary service'
    })
})


module.exports = router;