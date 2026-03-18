const express = require('express')
const app = express() 
const urlRoute  = require('./routes/url')
const {connectToDb} = require('./connection')
const URL = require('./model/url')
const path = require('path')
const staticRoute = require('./routes/staticRouter.js')

app.use(express.json())

// url encoded ke liye middleware
app.use(express.urlencoded ({extended:false}))



app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.use('/home',staticRoute)



app.use('/url', urlRoute)



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