const express = require('express')
const { handleUserSingup,handleUserLogin } = require('../controller/user')

const router = express.Router();
router.post('/' , handleUserSingup)
router.post('/login' , handleUserLogin)

module.exports = router