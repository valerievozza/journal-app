const mongoose = require('mongoose')

const DescriptionSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Description', DescriptionSchema)