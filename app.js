const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// route
app.get('/', (req, res) => {
  res.render('index')
})

app.delete('/', (req, res) => {
  console.log('delete index')
})

app.listen(3000, (req, res) => {
  console.log('Server start listening port 3000')
})
