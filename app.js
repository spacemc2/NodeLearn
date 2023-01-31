
const bodyParser = require('body-parser');

const express = require('express');
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


require('dotenv').config()
const port = process.env.PORT;
const user = process.env.USER_MONG;
const password = process.env.PASSWORD_MONG;
const database = process.env.DATABASE_MONG;


// template engine
app.set('view engine', 'ejs')
app.set('views' + __dirname + '/views')

app.use(express.static(__dirname + '/public'))

// Routes Web
app.use('/', require('./router/routesWeb'))
app.use('/pets', require('./router/pets'))

// Database connection

const url = `mongodb+srv://${user}:${password}@cluster0.qig5qhd.mongodb.net/${database}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

mongoose.connect(url)
    .then(() => console.log('Database Connected'))
    .catch(e => console.log(e))

app.use((req, res, next) => {

    res.status(404).render('404')

})

app.listen(port, () => {
    console.log('listening your requests...', port)
})