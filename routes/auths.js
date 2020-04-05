const express = require('express')
const router = express.Router()
const passport = require('passport')

// If you need additional permissions from the user (EX: email, user likes...), the permissions can be requested via the scope option to passport.authenticate(). Otherwise, 只會拿到 id 跟姓名...等一些基本資料
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: '發生錯誤，請重試一次' // flash an error message
  })
)

module.exports = router
