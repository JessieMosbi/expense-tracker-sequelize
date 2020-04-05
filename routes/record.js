const express = require('express')
const router = express.Router()

// model
const db = require('../models')
const Record = db.Record
const User = db.User

// 新增
router.get('/new', (req, res) => {
  res.render('edit')
})

router.post('/new', (req, res) => {
  res.send('新增一筆支出')
})

// 編輯
router.get('/edit/:id', (req, res) => {
  res.render('edit')
})

router.put('/:id', (req, res) => {
  res.send('編輯一筆支出')
})

// 刪除
router.delete('/:id', (req, res) => {
  res.send('刪除一筆支出')
})

module.exports = router
