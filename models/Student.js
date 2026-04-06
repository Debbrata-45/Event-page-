const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  phone: { 
    type: String, 
    required: true,
    minlength: 10,
    maxlength: 10
  },
  course: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);