const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");   // 👈 this line was missing

const recipeSchema = new mongoose.Schema({
  image: { type: String, required: true },

  name: { type: String, required: true, trim: true },

  price: {
    small: { type: Number, min: 0 },
    large: { type: Number, min: 0 },
    regular: { type: Number, required: true, min: 0 }
  },

  description: { type: String, required: true },

  // ✅ Flexible & normalized category (IMPORTANT)
  category: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },

  prepTime: { type: String, default: '5 mins' },
  cookTime: { type: String, default: '10 mins' },
  serving: { type: Number, default: 1 },

  ingredients: [String],
  
sources: {
  sauce: { 
    type: String, 
    trim: true,
    default: ''
  },
  filling: { 
    type: String, 
    trim: true,
    default: ''
  }
},
  
  preparation: [String],
  note: String,

  isVeg: { type: Boolean, default: true },
  // ✅ Add ONLY these fields (no existing changes)
totalOrders: { type: Number, default: 0 },
totalRevenue: { type: Number, default: 0 },

createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date },

isDeleted: { type: Boolean, default: false }

}, { timestamps: true });



// 🔹 Indexes (KEEPED SAME)
recipeSchema.index({ createdAt: -1 });
recipeSchema.index({ category: 1 });
recipeSchema.index({ name: 1 });

// 🔹 Text search
recipeSchema.index({ name: 'text', description: 'text' });



module.exports = mongoose.model('Recipe', recipeSchema);

