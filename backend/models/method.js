// src/models/Method.js ✅ CORRECT & PRODUCTION-READY
const mongoose = require('mongoose');

const methodSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  sauce: {
    type: String,
    default: ''
  },
  fillings: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Method', methodSchema);
