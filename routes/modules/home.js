const express = require('express')
const router = express.Router()
const Url = require('../../Models/url')
const generateUrl = require('../../generateUrl')

// render home page
router.get('/', (req, res) => {
  res.render('index')
})

// make a shorten URL
router.post('/', (req, res) => {
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

// get original URL
router.get('/:url', (req, res) => {
  const url = req.params.url

  Url.findOne({ shortenUrl: url })
    .lean()
    .then(item => {
      if (!item) {
        res.redirect('/')
      } else {
        res.redirect(`${item.originalUrl}`)
      }
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
