const express = require('express')
const mongoose = require('mongoose')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error')
})
db.once('open', () => {
  console.log('Mongodb connected')
})

app.get('/', (req, res) => {
  res.send('This page is working sucessful')
})

app.listen(port, () => {
  console.log(`Now app.js is running on http://localhost:${port}`)
})