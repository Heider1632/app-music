const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  name: {
    type: String,
    require: true
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

module.exports = mongoose.model('Forum', forumSchema);
