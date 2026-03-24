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
    const userValidtion = await User.findOne({email,password})
    
    if (!userValidtion) return res.render('login', {
        error : 'Invalid User Email ya Password , kya kiya re lawde!'
    })

// ager tumhara sab theek hai to ek session id bana deta hoon
    const sessionId = uuidv4()
    setUser(sessionId,userValidtion)
    res.cookie('uid',sessionId)

    return res.redirect('/')

}



module.exports = {handleUserSingup,handleUserLogin};