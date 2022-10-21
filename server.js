const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Link = require('./Modules/Links.js')
const path = require('path')
const app = express()
const connectDB = require('./db/connectDB.js')
require('dotenv').config()
app.use(cors())

app.use(express.json())

app.post('/', async (req, res) => {
  const { mainUrl } = req.body
  const linkIsHere = await Link.findOne({ mainUrl })
  if (linkIsHere) {
    return res.json({ dataArr: [linkIsHere] })
  }
  const newLink = await Link.create({ mainUrl })

  res.json({ dataArr: [newLink] })
})
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params

  const linkItem = await Link.findOne({ shortUrl })

  if (!linkItem) {
    res.status(404).json({ msg: 'not found' })
  }
  return res.redirect(linkItem.mainUrl)
})

const PORT = process.env.PORT || 4000
const start = async () => {
  try {
    connectDB()
    app.listen(process.env.PORT || 5000, console.log(`we are on ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./front-end/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
  })
}
start()
