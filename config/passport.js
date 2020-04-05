const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

// Before authenticating requests, the strategy (or strategies) used by an application must be configured.
module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return console.log(err)
          if (!isMatch) return done(null, false)
          return done(null, user)
        })
      })
      .catch((err) => console.log(err))
  }))

  // Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // Handlebars: Access has been denied to resolve the property "username" because it is not an "own property" of its parent. You can use following code to let template use user Object
    User.findByPk(id)
      .then((user) => {
        user = user.get()
        done(null, user)
      })
      .catch((err) => console.log(err))
  })
}
