const express = require('express')
const router = express.Router()
const { handleGenerateShortURL,handleGetAnalytics } = require('../controller/url')

/**
 * post ker sakte hoo kuch bhi...// http://localhost:8001/url
 * {
      "url": "https://google.com"
    }
 */
router.post('/',handleGenerateShortURL)

// analytic dekh sakte hoo using //http://localhost:8001/url/analytics/{shortID}
router.get('/analytics/:shortId', handleGetAnalytics)


module.exports = router;