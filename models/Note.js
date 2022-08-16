const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  // status: {
  //   type: String,
  //   default: 'public',
  //   enum: ['public', 'private']
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Note', NoteSchema)