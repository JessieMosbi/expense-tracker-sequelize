const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: require('./handlebarsHelpers.js') }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())

// session and passport
app.use(session({
  secret: 'Jessie secret key',
  cookie: {
    maxAge: 60 * 30 * 1000
  },
  resave: 'false',
  saveUninitialized: 'false'
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// express locals (store params for views to use)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.welcome_msg = req.flash('success') // passport
  res.locals.error_msg = req.flash('error') // passport
  res.locals.success_msg = req.flash('success_msg') // mine
  res.locals.warning_msg = req.flash('warning_msg') // mine
  next()
})

// router
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/records', require('./routes/record.js'))
app.use('/auth', require('./routes/auths.js'))

app.listen(3000, (req, res) => {
  console.log('Server start listening port 3000')
})
