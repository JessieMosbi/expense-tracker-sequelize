const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('首頁')
})

module.exports = router
