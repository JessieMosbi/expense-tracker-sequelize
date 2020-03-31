const express = require('express')
const router = express.Router()

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('註冊')
})

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('登入')
})

// 登出
router.get('/logout', (req, res) => {
  res.send('登出')
})

module.exports = router
