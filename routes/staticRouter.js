const express = require('express')
const router = express.Router()
const URL = require('../model/url')


router.get('/' ,  async (req,res) =>{
    if (req.user) return res.redirect('/login')


    const allUrls = await URL.find({})
    return res.render('home', {
        urls:allUrls
    })
})

router.get('/singup', (req,res) => {
    return res.render('singup') 
})

router.get('/login', (req,res) =>{
    return res.render('login')
})


module.exports = router