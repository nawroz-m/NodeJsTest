const express = require('express')
const User = require('../models/user')
const router = express.Router()
const app = express()




router.get('/user/signup', async (req, res)=>{
    res.render('signup', {
        title: 'Sign Up '
    })
})

router.post('/user/signup', async (req, res)=>{
    try{
        const user = new User(req.body)
        await user.save().then((user)=>{
            res.status(200).redirect('/user/login')
            console.log(user)
        }).catch((e)=>{
            res.status(400).send(e)
        })
    } catch(e){
        res.status(500).send()
    }
})

router.get('/user/login', async (req, res)=>{
    res.render('login', {
        title: "Log In"
    })
})

router.post('/user/login', async (req, res)=>{
    try{
        const user = await User.findByCredential(req.body.email, req.body.password)
        res.status(200).send(user)
    } catch(e){
        res.status(500).send()
    }
})

// // list of registered user

// router.get('/user/list', async (req, res)=>{
//     try{

//     } catch (e){
//         res.status(500).send()
//     }
// })



module.exports = router