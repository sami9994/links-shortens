const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Link = require('./Modules/Links.js')

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

const start = async () => {
  try {
    connectDB()
    app.listen(PORT, console.log(`we are on ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

const PORT = process.env.PORT || 4000
start()
