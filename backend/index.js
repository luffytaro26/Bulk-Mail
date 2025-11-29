// index=server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2643;

app.use(cors()); // Allow all origins (change in production if needed)
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// MongoDB collection for credentials
const Credential = mongoose.model('Credential', {}, 'bulkmail');

app.post('/sendmail', async (req, res) => {
  const { msg, maildata } = req.body;

  try {
    const data = await Credential.find();
    if (!data || data.length === 0) {
      return res.status(500).json({ success: false, error: "No credentials found" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: data[0].user,
        pass: data[0].pass, // App password
      },
    });

    // Send emails one by one
    for (const email of maildata) {
      await transporter.sendMail({
        from: data[0].user,
        to: email,
        subject: 'Bulk Email',
        text: msg,
      });
      console.log("Mail sent to", email);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
