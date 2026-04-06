// ✅ UPDATED REGISTER FUNCTION (with backend message handling)
async function registerStudent(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const course = document.getElementById("course").value;
  const password = document.getElementById("password").value;

  // Validation
  if(!name || !email || !phone || !course || !password){
    alert("All fields required ❌");
    return;
  }

  if(!email.includes("@")){
    alert("Invalid Email ❌");
    return;
  }

  if(phone.length !== 10 || isNaN(phone)){
    alert("Phone must be 10 digits ❌");
    return;
  }

  const res = await fetch("/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name,email,phone,course,password})
  });

  const msg = await res.text();
  alert(msg);

  // ✅ Only redirect if success
  if(msg.includes("Successfully")){
    window.location="login.html";
  }
}

// ✅ Event redirect
function goEvent(name){
  window.location = "event.html?name=" + name;
}

// ✅ LOAD DATA
async function loadData(){
  const students = await fetch("/students").then(res=>res.json());
  const events = await fetch("/events").then(res=>res.json());

  document.getElementById("stats").innerText =
    `Total Students: ${students.length} | Event Registrations: ${events.length}`;

  if(document.getElementById("studentCount")){
    document.getElementById("studentCount").innerText = students.length;
  }
  if(document.getElementById("eventCount")){
    document.getElementById("eventCount").innerText = events.length;
  }

  const sTable = document.getElementById("studentTable");
  sTable.innerHTML = "";
  students.forEach(s=>{
    sTable.innerHTML += `
    <tr>
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.phone}</td>
      <td>${s.course}</td>
    </tr>`;
  });

  const eTable = document.getElementById("eventTable");
  eTable.innerHTML = "";
  events.forEach(e=>{
    eTable.innerHTML += `
    <tr>
      <td>${e.name}</td>
      <td>${e.email}</td>
      <td>${e.eventName}</td>
      <td>${e.branch}</td>
      <td>${e.semester}</td>
      <td>${e.kuId}</td>
    </tr>`;
  });
}

// 🎞 Slider
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(()=>{
  if(slides.length === 0) return;
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

// 🔐 OLD SIMPLE LOGIN (optional)
function login(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user === "admin" && pass === "1234"){
    window.location = "admin.html";
  } else {
    window.location = "index.html";
  }
}

// ===============================
// ✅ NEW LOGIN SYSTEM
// ===============================

// Toggle login forms
function showStudent(){
  document.getElementById("studentLogin").style.display = "block";
  document.getElementById("adminLogin").style.display = "none";
}

function showAdmin(){
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("studentLogin").style.display = "none";
}

// 🎓 Student login
async function loginStudent(){
  const input = document.getElementById("loginInput").value;
  const password = document.getElementById("loginPass").value;

  const res = await fetch("/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({input,password})
  });

  const data = await res.json();

  if(data.success){
    window.location="index.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}

// 🛠 Admin login
function loginAdmin(){
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if(user==="admin" && pass==="1234"){
    window.location="admin.html";
  } else {
    alert("Wrong Admin Login ❌");
  }
}