const mongoose = require('mongoose')

const database = mongoose.connect("mongodb://127.0.0.1:27017/NodeJsTest", ()=>{
    console.log('Connected to the database success fully')
})
