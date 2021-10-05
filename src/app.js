const express = require('express')// Allows us to set up middlewares to respond to HTTP Requests
const app = express()
const path = require('path') //this allows us to interact with file paths easily
const hbs = require('hbs')  //my default view engine
require('../db/mongoose')
const router = require('../src/routes/user')
const allUserRout = require('../src/models/listOfallUser')


const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')


// binding application level middleware
app.use(express.urlencoded(publicDirectoryPath))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router)
app.use(allUserRout)
hbs.registerPartials(partialsPath)



app.set('view engine', 'hbs')
app.set('views', viewsPath)


const port = process.env.PORT|| 3000

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(port, ()=>{ //this is used to bind and listen the connections on the specified host and port.
    console.log('Connected to the Server Successfully!')
})
