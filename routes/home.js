const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth.js')

// model
const db = require('../models')
const Record = db.Record
const User = db.User

router.get('/', authenticated, (req, res) => {
  res.render('index')
})

module.exports = router
