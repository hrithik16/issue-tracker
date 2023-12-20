const mongoose = require("mongoose");

const Bug = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  project_id: {
    type: Number,
    required: true,
  },
});
const bug = mongoose.model("Bug", Bug);

module.exports = bug;
