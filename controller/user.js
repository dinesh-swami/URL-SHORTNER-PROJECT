const User = require('../model/user')
const {v4: uuidv4} = require('uuid')
const {setUser,getUser} = require('../services/auth')

async function handleUserSingup(req,res) {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.render('home') // me waps home page per send kar dunga
    
}

async function handleUserLogin(req , res) {
    const {email,password} = req.body;
    const userValidtion = await User.findOne({ email , password })

    if (!userValidtion) return res.render('login', {
        error : 'Invalid User Email ya Password , kya kiya re lawde!'
    })

    const token = setUser(userValidtion)  // ✅ userValidtion use karo!
    res.cookie('token',token)

    return res.redirect('/')

}



module.exports = {handleUserSingup,handleUserLogin};