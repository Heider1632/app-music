const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  theme: String,
  artist: String,
  letter: {
    type: String,
    required: true
  },
  forum_id: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Song', songSchema);