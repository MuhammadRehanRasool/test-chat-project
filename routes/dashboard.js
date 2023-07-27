const express = require('express');
const router = express.Router();
const { Message } = require('./../models');

// Define the /dashboard route
// router.get('/dashboard', (req, res) => {
//   // Handle the request and send a response
//   res.send('Welcome to the dashboard!');
// });


router.post("/send-message", async (req, res) => {
  console.log(req.body)
  try {
    const newMessage = await Message.create({
      ...req.body
    });
    res.json(newMessage);


  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "user not created",
    });
  }
});

router.get("/messages", async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

// Export the router
module.exports = router;