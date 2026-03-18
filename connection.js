const mongoose = require('mongoose')

async function connectToDb(dbURL) {
    mongoose.connect(dbURL)
    .then(()=> console.log('Connected To MongoDB...'))
    .catch((err) => console.log('DB Connection Failed...',err))
}
module.exports = {
    connectToDb,
}