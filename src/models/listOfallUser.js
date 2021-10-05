const User = require('../models/user')

const express = require('express')

const allUserRout = express.Router()

allUserRout.get('/user/all', async (req, res)=>{
    try{
        const user = await User.find({})
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = allUserRout