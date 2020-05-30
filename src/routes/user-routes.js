const express = require('express')
const User = require('../models/user')

const router = new express.Router()


//Signup
router.post('/user/signup',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/signin',async(req,res)=>{

    try{
        const user = await User.findByCredintials(req.body.email,req.body.password)
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

module.exports = router