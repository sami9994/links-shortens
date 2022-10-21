const mongoose = require('mongoose')
const shortid = require('shortid')
const LinksSchema = new mongoose.Schema({
  mainUrl: { type: String, required: true },
  shortUrl: { type: String, default: shortid.generate },
})
module.exports = mongoose.model('Links', LinksSchema)
