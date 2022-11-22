const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const generateUrl = require('./generateUrl')
const Url = require('./Models/url')

const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error')
})
db.once('open', () => {
  console.log('Mongodb connected')
})

const app = express()
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortenUrl = generateUrl()
  console.log(shortenUrl)
  return Url.create({ originalUrl, shortenUrl })
    .then(() => {
      res.render('shortenUrl', { shortenUrl })
    })
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`Now app.js is running on http://localhost:${port}`)
})
