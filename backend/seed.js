require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/recipe'); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/CafeRecipes';
// ----------------- CONNECT FUNCTION -----------------
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
}

// ----------------- YOUR DATA ARRAYS -----------------


const healthyShakesData = [
  {
  name: "Chocolate Cherry Recovery Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  price: { regular: 249 },
  description: "High-protein recovery shake with cherries, chocolate protein, and healthy fats",
  category: "shakes",
  subCategory: "berry-protein",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Cherries",
    "Spinach",
    "Chocolate protein powder",
    "Walnuts",
    "Flax seeds",
    "Almond milk"
  ],
  preparation: [
    "Add all ingredients to blender",
    "Blend until smooth",
    "Serve chilled"
  ],
  note: "Approx. 50g protein"
},
{
  name: "Triple Berry Antioxidant Shake",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Antioxidant-rich shake with mixed berries, yogurt, and chia seeds",
  category: "shakes",
  subCategory: "berry-protein",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Strawberries",
    "Blueberries",
    "Raspberries",
    "Greek yogurt",
    "Chia seeds",
    "Spinach"
  ],
  preparation: [
    "Blend all ingredients",
    "Pour and serve fresh"
  ],
  note: "Approx. 20g protein"
},
{
  name: "Strawberry Banana Kefir Shake",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 219 },
  description: "Probiotic-rich kefir shake for gut health",
  category: "shakes",
  subCategory: "berry-protein",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Frozen strawberries",
    "Banana",
    "Kefir",
    "Flaxseeds"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Under 300 calories"
},
{
  name: "Blueberry Tofu Power Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "Vegan protein shake with blueberries and silken tofu",
  category: "shakes",
  subCategory: "berry-protein",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Blueberries",
    "Silken tofu",
    "Almond milk",
    "Cinnamon"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve immediately"
  ],
  note: "Approx. 25g protein"
},
{
  name: "Tropical Raspberry Avocado Shake",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 249 },
  description: "Creamy tropical shake with raspberries, avocado, and coconut water",
  category: "shakes",
  subCategory: "berry-protein",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Raspberries",
    "Avocado",
    "Pineapple",
    "Coconut water"
  ],
  preparation: [
    "Blend all ingredients until smooth",
    "Serve chilled"
  ],
  note: "High fiber, creamy texture"
},
{
  name: "Pineapple Spinach Green Shake",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Refreshing detox shake with pineapple and spinach",
  category: "shakes",
  subCategory: "green-detox",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Pineapple",
    "Spinach",
    "Chia seeds",
    "Coconut water"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Low-calorie detox drink"
},
{
  name: "Kale Banana Ginger Shake",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Anti-inflammatory vegan shake with kale and ginger",
  category: "shakes",
  subCategory: "green-detox",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Kale",
    "Banana",
    "Ginger",
    "Silken tofu",
    "Coconut milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 22g vegan protein"
},
{
  name: "Avocado Spinach Cream Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 219 },
  description: "Creamy iron-rich shake with avocado and peanut butter",
  category: "shakes",
  subCategory: "green-detox",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Avocado",
    "Spinach",
    "Banana",
    "Soy milk",
    "Peanut butter"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Approx. 15g protein"
},
{
  name: "Simple Green Boost Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 179 },
  description: "Hydrating detox shake with greens, apple, and hemp seeds",
  category: "shakes",
  subCategory: "green-detox",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Spinach",
    "Apple",
    "Cucumber",
    "Lemon",
    "Hemp seeds"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 10g plant protein"
},
{
  name: "Zesty Tomato Kale Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 179 },
  description: "Savory low-carb shake with tomatoes and kale",
  category: "shakes",
  subCategory: "green-detox",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Tomatoes",
    "Kale",
    "Celery",
    "Lime",
    "Chia seeds"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Savory detox option"
},
{
  name: "Mango Banana Fat-Burn Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 219 },
  description: "Filling tropical shake with mango, banana, and yogurt",
  category: "shakes",
  subCategory: "tropical",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Mango",
    "Banana",
    "Greek yogurt",
    "Water"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Vitamin-rich and filling"
},
{
  name: "Tropical Sunrise Vegan Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 249 },
  description: "High-protein tropical vegan shake with mango and pineapple",
  category: "shakes",
  subCategory: "tropical",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Mango",
    "Pineapple",
    "Plant protein",
    "Coconut milk",
    "Orange juice"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Approx. 23g protein"
},
{
  name: "Mango Papaya Delight Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Digestive-friendly tropical shake with turmeric",
  category: "shakes",
  subCategory: "tropical",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Mango",
    "Papaya",
    "Yogurt",
    "Turmeric"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Good for digestion"
},
{
  name: "Strawberry Kiwi Booster Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 219 },
  description: "Tangy vitamin C-rich shake with strawberries and kiwi",
  category: "shakes",
  subCategory: "tropical",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Strawberries",
    "Kiwi",
    "Yogurt",
    "Water"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Vitamin C boost"
},
{
  name: "Pineapple Coconut Colada Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "Dairy-free tropical shake with pineapple and coconut",
  category: "shakes",
  subCategory: "tropical",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Pineapple",
    "Coconut milk",
    "Banana",
    "Spinach"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Tropical vacation vibe"
},
{
  name: "Peanut Butter Banana Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Classic energy shake with peanut butter and oats",
  category: "shakes",
  subCategory: "nut-seed",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Peanut butter",
    "Banana",
    "Oats",
    "Soy milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 20g protein"
},
{
  name: "Apple Cinnamon Hemp Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Balanced breakfast shake with fiber and hemp protein",
  category: "shakes",
  subCategory: "nut-seed",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Apple",
    "Cinnamon",
    "Hemp seeds",
    "Almond milk",
    "Oats"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Stable blood sugar"
},
{
  name: "Apple Cinnamon Hemp Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Balanced breakfast shake with fiber and hemp protein",
  category: "shakes",
  subCategory: "nut-seed",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Apple",
    "Cinnamon",
    "Hemp seeds",
    "Almond milk",
    "Oats"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Stable blood sugar"
},
{
  name: "Almond Butter Oat Hemp Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Hearty vegan shake with oats, hemp, and almond butter",
  category: "shakes",
  subCategory: "nut-seed",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Oats",
    "Hemp seeds",
    "Flax seeds",
    "Peanut butter",
    "Plant milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Approx. 25g protein"
},
{
  name: "Pumpkin Pie Egg White Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "High-protein seasonal shake with pumpkin and egg whites",
  category: "shakes",
  subCategory: "nut-seed",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Pumpkin",
    "Egg whites",
    "Spices",
    "Almond milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 28g protein"
},
{
  name: "Coconut Matcha Latte Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "Antioxidant-rich matcha shake with coconut milk and banana",
  category: "shakes",
  subCategory: "superfood-veggie",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Matcha",
    "Coconut milk",
    "Collagen",
    "Banana"
  ],
  preparation: [
    "Blend all ingredients until smooth",
    "Serve chilled"
  ],
  note: "Antioxidant + creamy protein blend"
},
{
  name: "Carrot Apple Ginger Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Beta-carotene rich detox shake with carrot, apple, and ginger",
  category: "shakes",
  subCategory: "superfood-veggie",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Carrots",
    "Apple",
    "Ginger",
    "Orange juice",
    "Turmeric"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Glow-boosting antioxidant shake"
},
{
  name: "Beet Berry Detox Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Detox shake with beets, berries, and yogurt",
  category: "shakes",
  subCategory: "superfood-veggie",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Beets",
    "Mixed berries",
    "Yogurt",
    "Lemon juice"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Supports antioxidants and liver health"
},
{
  name: "Chocolate Avocado Indulgence Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 249 },
  description: "Dessert-style healthy shake with avocado, cocoa, and banana",
  category: "shakes",
  subCategory: "superfood-veggie",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Avocado",
    "Cocoa",
    "Banana",
    "Plant milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 15g protein, healthy fats"
},
{
  name: "Bedtime Casein Calm Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "Slow-digesting shake for overnight recovery",
  category: "shakes",
  subCategory: "superfood-veggie",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Casein protein",
    "Cherry",
    "Almond milk",
    "Nutmeg"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Ideal for nighttime muscle recovery"
},
{
  name: "Apple Cinnamon Oat Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Fiber-rich shake for fullness and cholesterol support",
  category: "shakes",
  subCategory: "weight-management",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Apple",
    "Oats",
    "Cinnamon",
    "Nutmeg",
    "Yogurt"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "High fiber, filling shake"
},
{
  name: "Green Pea Protein Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 239 },
  description: "Low-sugar green protein shake with pea protein and greens",
  category: "shakes",
  subCategory: "weight-management",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Pea protein",
    "Spinach",
    "Kiwi",
    "Cucumber"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Approx. 30g plant protein"
},
{
  name: "Scaled Down Mass Gain Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 229 },
  description: "Nutrient-dense shake for energy and weight gain",
  category: "shakes",
  subCategory: "weight-management",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Banana",
    "Peanut butter",
    "Oats",
    "Milk",
    "Honey"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Calorie-dense energy shake"
},
{
  name: "Spinach Banana Peanut Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 199 },
  description: "Iron-rich shake with spinach, banana, and peanut butter",
  category: "shakes",
  subCategory: "weight-management",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Spinach",
    "Banana",
    "Peanut butter",
    "Soy milk"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve fresh"
  ],
  note: "Approx. 15g protein"
},
{
  name: "Banana Strawberry Soy Shake",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",

  price: { regular: 189 },
  description: "Simple daily shake with banana, strawberry, and soy milk",
  category: "shakes",
  subCategory: "weight-management",
  prepTime: "5 min",
  serving: 1,
  ingredients: [
    "Bananas",
    "Strawberries",
    "Soy milk",
    "Flax seeds"
  ],
  preparation: [
    "Blend all ingredients",
    "Serve chilled"
  ],
  note: "Balanced everyday shake"
}
]
  




async function insertRecipes() {
  try {
    if (!healthyShakesData.length) {
      console.log('⚠️ No recipes found to insert.');
      return;
    }

    const result = await Recipe.insertMany(healthyShakesData);
    console.log(`🎉 Successfully inserted ${result.length} recipes`);

  } catch (error) {
    console.error("❌ Insert error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB disconnected");
  }
}



async function deleteRecipes() {
  try {
    if (!burgerData.length) {
      console.log('⚠️ No recipes found to delete.');
      return;
    }

    const names = burgerData.map(item => item.name);

    const result = await Recipe.deleteMany({
      name: { $in: names }
    });

    console.log(`🗑️ Successfully deleted ${result.deletedCount} recipes`);

  } catch (error) {
    console.error("❌ Delete error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB disconnected");
  }
}



async function start() {
  try {
    await connectDB();

    await insertRecipes();

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB disconnected");
  }
}

start();