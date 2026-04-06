const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Models
const Student = require("./models/Student");
const Event = require("./models/Event");

// ✅ Student Register (Duplicate Email Block)
app.post("/register", async (req,res)=>{
  const { email } = req.body;

  // 🔍 check existing email
  const existing = await Student.findOne({ email });

  if(existing){
    return res.send("Email already registered ❌");
  }

  const student = new Student(req.body);
  await student.save();

  res.send("Registered Successfully ✅");
});

// ✅ Event Register (Duplicate Event Block)
app.post("/event", async (req,res)=>{
  const { email, eventName } = req.body;

  // 🔍 check if same user already registered for same event
  const existing = await Event.findOne({ email, eventName });

  if(existing){
    return res.send("Already registered for this event ❌");
  }

  const event = new Event(req.body);
  await event.save();

  res.send("Event Registered ✅");
});

// Get Students
app.get("/students", async (req,res)=>{
  const data = await Student.find();
  res.json(data);
});

// Get Events
app.get("/events", async (req,res)=>{
  const data = await Event.find();
  res.json(data);
});

// ✅ Login (student)
app.post("/login", async (req,res)=>{
  const {input, password} = req.body;

  const user = await Student.findOne({
    $or: [{email: input}, {phone: input}]
  });

  if(user && user.password === password){
    res.json({success:true});
  } else {
    res.json({success:false});
  }
});

app.listen(3000, ()=>console.log("Server running on http://localhost:3000"));