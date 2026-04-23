// require("dotenv").config();
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

// async function createAdmin() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const adminExists = await User.findOne({ username: "admin" });
//   if (adminExists) {
//     console.log("Admin already exists");
//     process.exit(0);
//   }

//   const admin = new User({
//     username: "admin",
//     password: "Abdmsdcr7#", // will be hashed by pre-save
//     role: "admin",
//   });

//   await admin.save();
//   console.log("Admin created successfully");
//   process.exit(0);
// }

// createAdmin().catch(console.error);
