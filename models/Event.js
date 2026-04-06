const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventName: String,
  branch: String,
  semester: String,
  kuId: String
});

module.exports = mongoose.model("Event", eventSchema);