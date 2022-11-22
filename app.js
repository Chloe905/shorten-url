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

  // check if the url is already exist
  Url.findOne({ originalUrl })
    .lean()
    .then((url) => {
      if (!url) {
        // generate a new string if not found in database
        const shortenUrl = generateUrl()
        return Url.create({ originalUrl, shortenUrl })
          .then(() => {
            res.render('shortenUrl', { shortenUrl })
          })
          .catch(err => console.log(err))
      } else {
        // if found, render that Url
        return res.render('shortenUrl', { shortenUrl: url.shortenUrl })
      }
    })
})

app.get('/:url', (req, res) => {
  const url = req.params.url

  Url.findOne({ shortenUrl: url })
    .lean()
    .then(item => { res.redirect(`${item.originalUrl}`) })
    .catch(err => {
      res.redirect('/')
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`Now app.js is running on http://localhost:${port}`)
})
