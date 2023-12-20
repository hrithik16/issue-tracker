const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const project = mongoose.model("Project", Project);

module.exports = project;
