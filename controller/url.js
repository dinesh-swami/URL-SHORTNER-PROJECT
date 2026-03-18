const URL = require('../model/url')

const { nanoid } = require('nanoid');

async function handleGenerateShortURL(req , res) {
    const body = req.body

    if (!body.url) return res.status(400).json({message : "Url Must Be Required..."})
    const shortId = nanoid(8);
    await URL.create({
        shortId  : shortId ,
        redirectURL : body.url,
        visitHistory : []
    })
    const allUrls = await URL.find({})
    return res.render('home', {
        id : shortId,
        urls : allUrls
    })
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
     })
    
}








module.exports = {
     handleGenerateShortURL,
     handleGetAnalytics

    }
