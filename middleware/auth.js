const {getUser} = require('../services/auth')

async function restricetedToLoggedUserOnly(req,res,next) {
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect('/login')
    try {
        const user = getUser(userUid)
        if(!user) return res.redirect('/login')
        req.user = user;
        next()
    } catch (err) {
        return res.redirect('/login')
    }
        
    
}

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;
    try {
        const user = getUser(userUid)
        req.user = user;
    } catch (err) {
        req.user = null;
    }
    next()

}


module.exports = {restricetedToLoggedUserOnly,checkAuth}