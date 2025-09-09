const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookId: {
    type: Number,
    required: true,
    unique: true,
  },
  yearofpublication: {
    type: Number,
    required: true,
  },
  availablestatus: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Books", librarySchema);
