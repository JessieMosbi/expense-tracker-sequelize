const express = require('express')
const router = express.Router()

// model
const db = require('../models')
const Record = db.Record
const User = db.User

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
