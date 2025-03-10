const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const usersFile = path.join(__dirname, '../models/users.json');

const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
};

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let users = readUsers();

  if (users.some(user => user.email === email)) {
    return res.status(400).json({ success: false, message: "User already exists!" });
  }

  users.push({ name, email, password });
  writeUsers(users);

  return res.json({ success: true, message: "Registration successful! Redirecting to login..." });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body; 
  let users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
      return res.json({ success: true, message: "Login successful!", redirect: "/index.html" });
  } else {
      return res.status(401).json({ success: false, message: "Invalid email or password!" });
  }
});


module.exports = router;
