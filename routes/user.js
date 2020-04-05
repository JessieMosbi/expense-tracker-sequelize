const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// model
const db = require('../models')
const User = db.User

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = []

  // check value
  if (!name.trim() || !email.trim() || !password.trim() || !password2.trim()) {
    errors.push({ message: '所有欄位均為必填' })
  }
  if (password !== password2) {
    errors.push({ message: '兩次密碼不一致' })
  }
  if (errors.length > 0) {
    res.render('register', { name, email, password, password2, errors })
    return false
  }

  // 檢查 user 是否存在
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        console.log('User already exists')
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        // insert into DB
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.log(err)
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) console.log(err)
            User.create({
              name,
              email,
              password: hash
            })
              .then((user) => res.redirect('/'))
              .catch((err) => console.log(err))
          })
        })
      }
    })
})

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  // check value
  const { email, password } = req.body
  if (!email.trim() || !password.trim()) {
    res.render('login', { email, password, warning_msg: '所有欄位均為必填' })
    return false
  }

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: '帳密錯誤，請重新登入' // flash an error message
  })(req, res, next)
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出，若欲繼續使用請重新登入')
  res.redirect('/users/login')
})

module.exports = router
