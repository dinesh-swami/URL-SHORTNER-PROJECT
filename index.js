const express = require('express')
const app = express() 
const {connectToDb} = require('./connection')
const URL = require('./model/url')
const path = require('path')
const cookieParser = require('cookie-parser') 
const urlRoute  = require('./routes/url')
const staticRoute = require('./routes/staticRouter.js')
const userRoute  = require('./routes/user')
const { restricetedToLoggedUserOnly, checkAuth } = require('./middleware/auth')

app.use(express.json())
app.use(cookieParser())

// url encoded ke liye middleware
app.use(express.urlencoded ({extended:false}))



app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.use('/user',userRoute)
app.use('/', checkAuth, staticRoute)
app.use('/url',restricetedToLoggedUserOnly, urlRoute)



app.use('/url/:shortId', async(req,res) =>{
    const shortId = req.params.shortId; 
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
     {
        $push :{
            visitHistory :{
                timestamps : Date.now(),
            },
        },
     }
    )
    res.redirect(entry.redirectURL)
})


connectToDb('mongodb://127.0.0.1:27017/short-url')
app.listen(8001, () => console.log('Server Running...'))