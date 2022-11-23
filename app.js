const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

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
app.use(routes)

app.listen(port, () => {
  console.log(`Now app.js is running on http://localhost:${port}`)
})
