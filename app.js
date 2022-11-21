const express = require('express')

const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('This page is working sucessful')
})

app.listen(port, () => {
  console.log(`Now app.js is running on http://localhost:${port}`)
})