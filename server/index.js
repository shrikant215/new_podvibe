// Import necessary modules
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const admin = require('firebase-admin'); 
const multer = require("multer");
const path = require("path");
const app = express();
const uri = process.env.MONGODB_URI;

console.log("ggggggggggggggggggg",process.env) // remove this after you've confirmed it is working

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


const user = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", user);




app.post('/api/login', async(req, res)=> {
  const{ email,password} = req.body;
  try{
      const user = await User.findOne({email, password});
      if(user){

          res.status(200).json({message: 'Login Successful', userId: user._id, name: user.name })
          console.log(user._id,user.name)
      }else{
          res.status(401).json({message: 'Invalid credentials'})
      }
  }catch(err){
      res.status(500).json({message: err.message})
  }
});


// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shrikantjk3@gmail.com",
    pass: "sral kgou hnqt qdwy",
  },
});

// Simulated in-memory database for storing OTPs
const otpMap = {};

// Route to send OTP for signup
app.post("/api/sendSignupOTP", async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered." });
  }

    // Generate OTP
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

      // Save OTP to the in-memory database
  otpMap[email] = otp;

  // Email message configuration
  const mailOptions = {
    from: "shrikantjk3@gmail.com",
    to: email,
    subject: "OTP for Signup",
    text: `Your OTP for signup is: ${otp}`,
  };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send OTP." });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "OTP sent successfully." });
      }
    });
  });

  // Route to verify OTP for signup
app.post("/api/verifySignupOTP", async (req, res) => {
  const { email, otp } = req.body;

  // Verify OTP
  if (!otpMap[email] || otpMap[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  res.status(200).json({ message: "OTP verification successful." });
});


// Sign-up endpoint
app.post("/api/signup", async (req, res) => {
  const { name, email, password, otp } = req.body;

  // Verify OTP
  if (!otpMap[email] || otpMap[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "Sign-up successful" });
      console.log(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
