const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
    {
        shortId :{
            type : String,
            unique : true,
            required :true,
        },
        redirectURL :{
            type : String,
            required :true,
        },
        visitHistory : [{
            Timestamp : {type : Number}
        }],
    },
    {timestamps:true}
)

const URL = mongoose.model('url',urlSchema)
module.exports = URL;