const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
    unique: true
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
