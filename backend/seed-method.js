// src/seed-methods.js
require('dotenv').config();
const mongoose = require('mongoose');
const Method = require('./models/method'); // ✅ Matches your model

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafe-recipes';

const METHODS_DATA = [
  {
    category: 'hot-coffee',
    sauce: '',
    fillings: '',
    method: `How to make an espresso shot:

Method:
• Grind coffee beans to a fine consistency.
• Add coffee grounds into portafilter and level evenly.
• Tamp firmly to create a flat surface.
• Lock portafilter into espresso machine.`
  },

  {
    category: 'cold-coffee',
    sauce: '',
    fillings: '',
    method: `How to make an espresso shot:

Method:
• Grind coffee beans to a fine consistency.
• Add coffee grounds into portafilter and level evenly.
• Tamp firmly to create a flat surface.
• Lock portafilter into espresso machine.`
  },

  {
    category: 'sandwiches',
    sauce: `VEG SANDWICHES:
----- SAUCE MAKING (VEG / NON-VEG SAUCE MAPPING) -----

🥪 VEG SANDWICH – SAUCE MAPPING

❄ Cold Veg
1. Veg Mayo Sandwich
   • Sauce: Mayonnaise + Black Pepper

2. Cheese Veg Sandwich
   • Sauce: Mayonnaise + Cheese Spread

3. Coleslaw Sandwich
   • Sauce: Mayonnaise (slightly sweet style)

4. Paneer Mayo Sandwich
   • Sauce: Mint Mayo + Light Green Chutney

5. Corn & Cheese Sandwich
   • Sauce: Mayonnaise + Cheese Sauce


🔥 Hot Veg
6. Grilled Veg Cheese Sandwich
   • Sauce: Butter + Green Chutney + Ketchup

7. Paneer Tikka Sandwich
   • Sauce: Tandoori Mayo + Mint Chutney

8. Cheese Chilli Toast Sandwich
   • Sauce: Chilli Sauce + Cheese Sauce

9. Mushroom Cheese Sandwich
   • Sauce: Garlic Mayo + Butter

10. Aloo Masala Toast Sandwich
    • Sauce: Butter + Green Chutney + Ketchup


🥪 NON-VEG SANDWICH – SAUCE MAPPING

❄ Cold Non-Veg
11. Chicken Mayo Sandwich
    • Sauce: Mayonnaise + Black Pepper

12. Egg Mayo Sandwich
    • Sauce: Mayonnaise + Mustard (light)

13. Chicken Coleslaw Sandwich
    • Sauce: Mayonnaise (slightly sweet)

14. Tuna Mayo Sandwich
    • Sauce: Mayonnaise + Lemon + Black Pepper

15. Chicken Cheese Sandwich
    • Sauce: Mayonnaise + Cheese Sauce


🔥 Hot Non-Veg
16. Grilled Chicken Cheese Sandwich
    • Sauce: Butter + Garlic Mayo

17. Chicken Tikka Sandwich
    • Sauce: Tandoori Mayo + Mint Chutney

18. Peri Peri Chicken Sandwich
    • Sauce: Peri Peri Sauce + Mayonnaise

19. Chicken Keema Sandwich
    • Sauce: Butter + Ketchup + Chilli Sauce

20. Egg Cheese Toast Sandwich
    • Sauce: Butter + Mayonnaise + Ketchup


⭐ Golden Rule (Remember This)
• Cold sandwiches → Mayo based
• Hot sandwiches → Butter + chutney or spicy sauces
• Tikka items → Mint + Tandoori Mayo
• Cheese items → Add cheese sauce / cheese mayo


💡 Pro Kitchen Tip
Pre-make these 5 mixes for speed:
1. Garlic Mayo
2. Mint Mayo
3. Tandoori Mayo
4. Peri Peri Mayo
5. Plain Mayo

👉 Use these mixes as base and tweak per item
👉 Saves time during rush hours`,


    fillings: `CHICKEN (12):
1. Chicken Mayo Filling
   • Shredded chicken
   • Mayonnaise
   • Onion
   • Capsicum
   • Pepper

2. Peri-Peri Chicken Filling
   • Shredded chicken
   • Peri-peri sauce
   • Mayo
   • Chilli flakes

3. BBQ Chicken Filling
   • Shredded chicken
   • BBQ sauce
   • Onion

4. Chicken Corn Filling
   • Chicken
   • Sweet corn
   • Mayo
   • Pepper

5. Chicken Tikka Filling
   • Tikka chicken
   • Onion
   • Capsicum
   • Mint mayo

6. Garlic Chicken Filling
   • Chicken
   • Garlic mayo
   • Pepper

7. Creamy Chicken Filling
   • Chicken
   • Cream
   • Mayo
   • Herbs

8. Pesto Chicken Filling
   • Chicken
   • Pesto sauce
   • Parmesan cheese

9. Chipotle Chicken Filling
   • Chicken
   • Chipotle mayo
   • Capsicum

10. Honey Mustard Chicken Filling
    • Chicken
    • Honey mustard sauce

11. Chicken Jalapeño Filling
    • Chicken
    • Jalapeño
    • Mayo

12. Teriyaki Chicken Filling
    • Chicken
    • Teriyaki sauce
    • Sesame seeds


🧀 PANEER & CHEESE FILLINGS (6)

13. Paneer Tikka Filling
    • Paneer cubes
    • Capsicum
    • Tandoori sauce

14. Paneer Mayo Filling
    • Paneer
    • Mayo
    • Onion

15. Paneer Bhurji Filling
    • Scrambled paneer bhurji
    • Onion
    • Tomato

16. Cheese Corn Filling
    • Sweet corn
    • Cheese
    • Butter

17. Spinach Cheese Filling
    • Spinach
    • Cream cheese

18. Jalapeño Cheese Filling
    • Jalapeño
    • Cheese spread


🥬 VEGETABLE FILLINGS (8)

19. Veg Mayo Filling
    • Cabbage
    • Carrot
    • Mayo

20. Russian Salad Filling
    • Potato
    • Carrot
    • Peas
    • Mayo

21. Coleslaw Filling
    • Cabbage
    • Carrot
    • Mayo dressing

22. Mexican Veg Filling
    • Beans
    • Corn
    • Capsicum
    • Chipotle mayo

23. Mushroom Garlic Filling
    • Sauteed mushrooms
    • Garlic butter

24. Spinach Corn Filling
    • Spinach
    • Sweet corn
    • White sauce

25. Mediterranean Veg Filling
    • Olive
    • Tomato
    • Cucumber
    • Feta cheese

26. Avocado Veg Filling
    • Avocado
    • Lemon
    • Pepper


🥚 EGG & SEAFOOD FILLINGS (4)

27. Egg Mayo Filling
    • Boiled eggs
    • Mayo
    • Mustard

28. Scrambled Egg Filling
    • Eggs
    • Butter
    • Pepper

29. Tuna Salad Filling
    • Tuna
    • Onion
    • Mayo

30. Smoked Fish Filling
    • Smoked fish
    • Cream cheese`,
    method: `⭐ Professional Sandwich Assembly Workflow
Typical café workflow:
1️ Bread + butter
2️ Sauce spread
3️ Lettuce layer
4️ Main filling
5️ Cheese
6️ Vegetables
7️ Top bread
8️ Grill or serve cold
9️ Cut diagonally
Average time: 60–90 seconds per sandwich
`
  },

  {
    category: 'burger',
    sauce:  `1. Classic Burger Sauce (Universal – Veg & Non-Veg)
• Ingredients:
o Mayonnaise: 100 g
o Tomato Ketchup: 30 g
o Mustard Sauce: 10 g
o Vinegar: 5 ml
o Sugar: 5 g
o Black Pepper: 2 g
• Preparation:
• Add all ingredients in bowl
• Mix until smooth and creamy
• Taste and adjust slight sweetness/tang
________________________________________
 2. Spicy Burger Sauce (For Chicken / Spicy Veg)
• Ingredients:
o Mayonnaise: 100 g
o Chilli Sauce: 20 g
o Peri Peri Sauce: 15 g
o Garlic Paste: 5 g
• Preparation:
• Mix all ingredients well
• Keep slightly thick consistency
________________________________________
 3. Garlic Mayo (Best for Grilled Burgers)
• Ingredients:
o Mayonnaise: 100 g
o Garlic (finely crushed): 5 g
o Lemon Juice: 5 ml
o Salt: 1 g
• Preparation:
• Mix all ingredients
• Rest for 10–15 mins (better flavor)
________________________________________
 4. Tandoori Burger Sauce (Paneer / Chicken Tikka)
• Ingredients:
o Mayonnaise: 100 g
o Tandoori Masala: 10 g
o Lemon Juice: 5 ml
o Red Chilli Powder: 2 g
• Preparation:
• Mix all until smooth
• Adjust spice as needed
________________________________________
 5. BBQ Mayo (For BBQ Chicken Burgers)
• Ingredients:
o Mayonnaise: 100 g
o BBQ Sauce: 30 g
• Preparation:
• Mix evenly
• Ready to use
________________________________________
 6. Cheese Sauce (For Cheese Burst Burgers)
• Ingredients:
o Butter: 10 g
o Maida: 10 g
o Milk: 150 ml
o Cheese: 50 g
o Salt: 1 g
• Preparation:
• Melt butter → add maida → cook lightly
• Add milk slowly → stir continuously
• Add cheese → cook till smooth
________________________________________
⭐ CORE SAUCES (START WITH THESE)
Keep only these for your kitchen:
✔ Classic Burger Sauce
✔ Garlic Mayo
✔ Spicy Sauce
✔ Tandoori Mayo
✔ Cheese Sauce
 Covers almost all burgers
`,
    fillings: ` VEG BURGERS – PATTY / FILLING SOP
________________________________________
1. Classic Veg Burger (Veg Patty)
• Ingredients (5 patties):
o Boiled Potato: 300 g
o Carrot (fine chop): 80 g
o Beans (fine chop): 60 g
o Peas (boiled): 80 g
o Bread Crumbs: 80 g
o Cornflour: 30 g
o Ginger-Garlic Paste: 10 g
o Green Chilli: 5 g
o Salt + Garam Masala: 5 g
• Preparation:
• Cook chopped veggies in little oil till dry
• Mash potato completely
• Mix all ingredients → make firm dough
• Shape patties (~80 g each)
• Dip in slurry → coat breadcrumbs
• Rest 10 min → fry medium heat till golden
________________________________________
2. Cheese Burst Veg Burger
• Ingredients:
o Veg Patty Mix: 100 g
o Cheese Cube: 20 g
• Preparation:
• Flatten patty mix
• Place cheese in center → seal properly
• Coat + fry till crispy
________________________________________
3. Spicy Bean Burger
• Ingredients:
o Boiled Rajma/Beans: 350 g
o Potato: 150 g
o Bread Crumbs: 80 g
o Cornflour: 30 g
o Chilli + Spices: 8 g
• Preparation:
• Mash beans + potato
• Add spices + crumbs
• Shape patties → coat → fry
________________________________________
4. Paneer Tikka Burger
• Ingredients:
o Paneer: 400 g
o Curd: 100 g
o Tandoori Masala: 10 g
o Cornflour: 30 g
• Preparation:
• Marinate paneer 30 min
• Lightly mash + bind
• Shape patties → shallow fry
________________________________________
5. Aloo Tikki Burger
• Ingredients:
o Potato: 400 g
o Cornflour: 40 g
o Spices: 8 g
• Preparation:
• Mash potato
• Add spices + binder
• Shape → coat → fry
________________________________________
6. Veggie Delight Burger
• Ingredients:
o Mixed Veg: 300 g
o Potato: 200 g
o Bread Crumbs: 80 g
• Preparation:
• Cook veg dry
• Mix with potato + crumbs
• Shape → coat → fry
________________________________________
7. Double Veg Patty Burger
• Use 2 Classic Veg Patties
________________________________________
9. Mushroom & Cheese Burger
• Ingredients:
o Mushroom: 300 g
o Butter: 20 g
o Garlic: 10 g
o Cheese: 100 g
• Preparation:
• Sauté mushroom + garlic till water dries
• Add cheese → mix
• Use as hot filling (no patty)
________________________________________
10. Jalapeño Cheese Burger
• Ingredients:
o Veg Patty Mix: 400 g
o Jalapeño: 50 g
o Cheese: 100 g
• Preparation:
• Mix jalapeño in patty
• Stuff cheese → shape → fry
________________________________________
11. Grilled Veg Burger
• Ingredients:
o Zucchini/Capsicum/Onion: 400 g
o Oil: 10 ml
• Preparation:
• Slice veggies
• Grill till charred
• Use as filling
________________________________________
12. Spinach & Corn Burger
• Ingredients:
o Spinach: 300 g
o Corn: 200 g
o Potato: 200 g
o Cheese: 100 g
o Cornflour: 40 g
• Preparation:
• Blanch spinach → remove water
• Mix all → bind
• Shape → coat → fry
________________________________________
 NON-VEG BURGERS – PATTY / FILLING SOP
________________________________________
13. Classic Chicken Burger
• Ingredients (5 patties):
o Minced Chicken: 500 g
o Bread Crumbs: 100 g
o Egg: 1
o Onion: 60 g
o Garlic: 10 g
o Salt + Pepper: 6 g
• Preparation:
• Remove moisture from chicken
• Mix all ingredients
• Shape patties (~100 g)
• Coat → rest → fry till cooked
________________________________________
14. Chicken Cheese Burger
• Ingredients:
o Chicken Patty Mix: 100 g
o Cheese: 20 g
• Preparation:
• Stuff cheese → seal
• Coat → fry
________________________________________
Double Chicken Cheese Burger
• Use 2 cheese chicken patties
________________________________________
15. Chicken Tandoori Burger
• Ingredients:
o Chicken: 500 g
o Curd: 150 g
o Tandoori Masala: 15 g
• Preparation:
• Marinate 1–2 hrs
• Grill till cooked
• Slice → use
________________________________________
16. Double Chicken Burger
• Use 2 chicken patties
________________________________________
17. Chicken Salami Burger
• Ingredients:
o Chicken Salami: 400 g
• Preparation:
• Grill slices lightly
• Stack in burger
________________________________________
18. BBQ Chicken Burger
• Ingredients:
o Chicken: 500 g
o BBQ Sauce: 100 g
• Preparation:
• Cook chicken → shred
• Mix BBQ sauce
________________________________________
19. Chicken Keema Burger
• Ingredients:
o Minced Chicken: 500 g
o Onion: 100 g
o Masala: 10 g
• Preparation:
• Cook keema till dry
• Use hot
________________________________________
20. Egg & Cheese Burger
• Ingredients:
o Egg: 1–2 per burger
o Cheese: 1 slice
• Preparation:
• Fry egg (round or omelette)
• Place cheese on hot egg
________________________________________
21. Scrambled Egg Burger
• Ingredients:
o Eggs: 2
o Butter: 5 g
• Preparation:
• Cook soft scrambled eggs
________________________________________
Peri-Peri Chicken Burger
• Ingredients:
o Chicken: 500 g
o Peri Peri Spice: 10 g
• Preparation:
• Cook chicken → toss in spice
________________________________________
23. Smoked Chicken Burger
• Ingredients:
o Smoked Chicken: 500 g
• Preparation:
• Heat → slice → use
________________________________________
24. Crispy Chicken Burger
• Ingredients:
o Chicken Breast: 5 pcs (120 g each)
o Buttermilk: 200 ml
o Maida: 150 g
o Cornflour: 80 g
o Egg: 1
o Spices: 10 g
• Preparation:
• Marinate chicken (2–4 hrs)
• Double coat (flour → marinade → flour)
• Deep fry till crispy
--------------------------------------------------------------------------------------------------------------------- 
 FINAL PROFESSIONAL NOTE
✔ Veg patties = dry + firm + coated
✔ Chicken patties = juicy + well bound + fully cooked
✔ Fillings (BBQ, Keema, Tandoori) = moist but NOT watery
✔ Standard patty size:
→ Veg: 80–100 g
→ Chicken: 100–120 g
`,
    method: ` Professional Sandwich Assembly Workflow
Typical café workflow:
1️ Bread + butter
2️ Sauce spread
3️ Lettuce layer
4️ Main filling
5️ Cheese
6️ Vegetables
7️ Top bread
8️ Grill or serve cold
9️ Cut diagonally
Average time: 60–90 seconds per sandwich
`
  },

  {
    category: 'pizza',
    sauce: `PIZZA SAUCE (BASE FOR ALL)
• Ingredients
o Tomato Puree: 500 g
o Garlic: 10 g
o Olive Oil: 20 ml
o Oregano: 5 g
o Chilli Flakes: 3 g
o Salt + Sugar: 5 g
• Preparation
• Heat oil → sauté garlic
• Add puree + spices
• Cook till thick (no water)
• Cool before use
`,
    fillings: ` pizza's dont have fillings, it have only layering...check it on recipe details page`,
    method: ` STANDARD PIZZA BASE (VERY IMPORTANT)
• Ingredients (for 5 medium pizzas)
o Maida: 500 g
o Yeast: 5 g
o Sugar: 10 g
o Salt: 8 g
o Oil: 20 ml
o Warm Water: 300 ml

• Preparation
• Activate yeast (warm water + sugar + yeast → 5–10 min)
• Add maida + salt + oil
• Knead soft dough (8–10 min)
• Rest 1–2 hours (till double)
• Divide into 150–180 g balls
• Rest again 15–20 min

PRO CAFÉ TIPS
✔ Cheese always above sauce (except cheese burst layering)
✔ Do NOT overload toppings → base becomes soggy
✔ Preheat oven properly (220–250°C)
✔ Use mozzarella for stretch
`
  },

  {
    category: 'roll',
    sauce: 'Mint Chutney, Garlic Mayo, Ketchup',
    fillings: `fillings are added into recipes...`,
    method: `
     BASE – ROLL ROTI / WRAP
• Ingredients (5 wraps)
o Maida: 300 g
o Salt: 5 g
o Oil: 15 ml
o Water: 180 ml
• Preparation
• Mix maida + salt + oil
• Add water → knead soft dough
• Rest 20–30 min
• Divide into balls
• Roll thin roti
• Cook lightly on pan (no crisp)
• Keep soft (cover with cloth)
......

    STANDARD ROLL ASSEMBLY
1️ Heat wrap
2️ Apply sauce
3️ Add filling (center)
4️ Add onion/veg
5️ Add cheese (optional)
6️ Roll tightly
7️ Toast lightly
⏱ Time: 3–5 minutes per roll

 PRO CAFÉ TIPS
✔ Do NOT overfill (easy rolling)
✔ Keep filling dry (no water leakage)
✔ Always roll tight (important for delivery)
✔ Use butter while toasting for taste

`
  },

  {
    category: 'beverage',
    sauce: 'N/A',
    fillings: `BASE MILKSHAKE FORMULA (VERY IMPORTANT)
• Ingredients (1 glass ~300 ml):
o Chilled Milk: 180 ml
o Ice Cream: 1 scoop (60–80 g)
o Sugar/Syrup: 10–15 g (if needed)
o Ice Cubes: 3–4 (optional)
• Preparation:
• Add all ingredients in blender
• Blend 20–30 seconds (smooth & thick)
• Pour into glass
• Garnish → serve immediately
GARNISH (CAFÉ STYLE)
✔ Whipped Cream
✔ Chocolate Drizzle
✔ Crushed Biscuits
✔ Choco Chips
✔ Nuts
________________________________________
 PRO CAFÉ TIPS
✔ Always use chilled milk
✔ Ice cream = thickness + premium taste
✔ Do NOT overuse ice (kills flavor)
✔ Serve immediately (best texture)
________________________________________
⏱ Time: 1–2 minutes per shake
`,
    method: `
🥤 BASE RULE (FOR ALL SHAKES)
• Always chocolate/strawberry drizzle inside glass first
• Pour shake slowly
• Top with whipped cream
• Final topping = product-specific garnish
________________________________________
🥤 Chocolate Milkshake
• Garnish:
• Chocolate syrup inside glass swirl
• Whipped cream on top
• Chocolate chips / choco flakes
• Optional: brownie crumbs
________________________________________
🥤 Oreo Milkshake
• Garnish:
• Chocolate drizzle inside glass
• Whipped cream
• Crushed Oreo on top
• Half Oreo biscuit on rim
________________________________________
🥤 KitKat Milkshake
• Garnish:
• Chocolate syrup swirl
• Whipped cream
• KitKat chunks on top
• 1 KitKat finger on glass
________________________________________
🥤 Strawberry Milkshake
• Garnish:
• Strawberry syrup swirl inside
• Whipped cream
• Fresh strawberry slice
• Light pink drizzle
________________________________________
🥤 Mango Milkshake
• Garnish:
• Mango pulp swirl
• Whipped cream (optional)
• Mango cubes on top
________________________________________
🥤 Vanilla Milkshake
• Garnish:
• Whipped cream
• Rainbow sprinkles
• Wafer stick

________________________________________
🥤 Hazelnut Milkshake
• Garnish:
• Chocolate drizzle
• Whipped cream
• Crushed hazelnuts
• Ferrero-style ball (optional premium)
________________________________________
🥤 Banana Milkshake
• Garnish:
• Honey drizzle
• Whipped cream
• Banana slices
• Choco chips (optional)
________________________________________
🥤  Nutella Milkshake
• Garnish:
• Nutella spread inside glass
• Whipped cream
• Nutella drizzle on top
• Choco chips / wafer
________________________________________
PRO CAFÉ GARNISH RULES
✔ Always contrast colors (light + dark)
✔ Use 3 elements max (not messy)
✔ Rim decoration = premium feel
✔ Garnish should be visible in delivery lid
________________________________________
 QUICK PREMIUM UPGRADE (SELL HIGH ₹)
• Add extra scoop ice cream on top (+₹30–₹50)
• Add brownie / Ferrero topping (+₹40–₹80)`
  },

  {
    category: 'mocktails',
    sauce: 'Grenadine, Blue Curacao, Lime Cordial',
    fillings: 'Fruits, Soda, Ice, Mint',
    method: `MOCKTAILS:
1. Glass + ice
2. Syrups + juice
3. Top soda
4. Garnish + stir
PRO CAFÉ MOCKTAIL RULES

✔ Always use transparent glass (visual appeal)
✔ Maintain color contrast (layering looks premium)
✔ Ice = full glass for refreshing look
✔ Use fresh garnish (not artificial)
`
  },

  {
    category: 'pasta',
    sauce: `All pasta souces are added in recipes, so check recipe details page...`,
    fillings: `BASE PREPARATION (FOR ALL PASTA)
• Pasta Boiling
• Ingredients:
o Pasta: 100 g (per portion)
o Water: 1 litre
o Salt: 10 g
o Oil: 5 ml
• Preparation:
• Boil water + salt
• Add pasta → cook 8–10 min (al dente)
• Drain → add little oil → toss
• Keep aside
`,
    method: `STANDARD PASTA WORKFLOW
1️ Boil pasta
2️ Prepare sauce
3️ Add vegetables/chicken
4️ Mix pasta
5️ Add cheese
6️ Serve hot / bake (if needed)
⏱ Time: 8–12 minutes per order
`
  },

  {
    category: 'fries',
    sauce: 'Ketchup, Mayo, Cheese Dip',
    fillings: `BASE – PERFECT FRENCH FRIES
• Ingredients (5 portions)
o Potatoes (large): 1 kg
o Salt: 10 g
o Oil: for frying
________________________________________
• Preparation (VERY IMPORTANT)
Step 1: Cutting
• Peel potatoes
• Cut into even sticks (medium thickness)
________________________________________
Step 2: Soaking
• Soak in cold water 20–30 min
removes starch (crispiness)
________________________________________
Step 3: First Fry (Blanching)
• Heat oil medium (140–150°C)
• Fry potatoes 3–4 min (no color)
• Remove → cool completely
________________________________________
Step 4: Second Fry (Crispy)
• Heat oil high (170–180°C)
• Fry till golden & crispy
• Remove → drain
________________________________________
✔ This is double-fry method (used in cafés)
`,
    method: `STANDARD FRIES WORKFLOW
1️ Cut & soak
2️ First fry (soft cook)
3️ Second fry (crispy)
4️ Season / top
5️ Serve immediately
⏱ Time: 5–7 minutes per order
________________________________________
 PRO CAFÉ TIPS
✔ Always double fry (game changer)
✔ Serve immediately (fries lose crisp fast)
✔ Use squeeze bottles for sauces
✔ Do NOT cover tightly (steam = soggy fries)
`
  },

  {
    category: 'salad',
    sauce: `•	Dressing & Flavorings:
o	Olive oil
o	Mayonnaise
o	Lemon juice
o	Honey (optional for fruit salad)
o	Caesar dressing
o	Italian dressing
o	Mint chutney (optional for paneer tikka salad)
`,
    fillings: `•	Spices & Seasonings:
o	Salt
o	Black pepper
o	Chaat masala (for sprout salad)
o	Dried oregano (for Greek salad)
`,
    method: `Typical café workflow (60-90 seconds per salad):

1️⃣ Chill bowl (34°F) → prevents wilting
2️⃣ Base greens → lettuce/rocket (dry)
3️⃣ Sturdy veg → cucumber/carrot rings
4️⃣ Protein → egg/paneer/chicken center
5️⃣ Dressing → drizzle, fold 3x tongs
6️⃣ Cherry tomatoes → halved top
7️⃣ Garnish → herbs/nuts edge
8️⃣ Serve immediately → NO waiting
9️⃣ Plate presentation → fork ready

Average time: 60–90 seconds per salad
`
  },

 {
  category: 'shakes',
  sauce: 'Ice Cream Base, Syrups',
  fillings: `BASE HEALTHY SHAKE FORMULA (VERY IMPORTANT)
• Ingredients (1 glass ~300 ml):
o Chilled Milk / Almond Milk: 200 ml
o Yogurt / Frozen Yogurt: 80–100 g  
o Fresh Fruit: 80–100 g (banana, mango, berries)
o Honey/Date Syrup: 10–15 g (natural sweetener)
o Ice Cubes: 4–6 (texture)
• Preparation:
• Add all ingredients in blender
• Blend 25–35 seconds (smooth & thick)
• Pour into glass
• Garnish → serve immediately
GARNISH (HEALTHY CAFÉ STYLE)
✔ Chia Seeds
✔ Granola Crumble
✔ Fresh Fruit Slices
✔ Mint Leaves
✔ Nuts (Almonds/Walnuts)
✔ Coconut Flakes
________________________________________
PRO CAFÉ TIPS
✔ Use frozen yogurt for creaminess (no ice cream guilt)
✔ Always chilled milk alternatives (almond/oat)
✔ Fresh fruit = premium taste + vibrant color
✔ Do NOT overuse ice (preserves fruit flavor)
✔ Market as "Guilt-Free Indulgence"
________________________________________
⏱ Time: 1–2 minutes per shake
`,

  method: `
🥤 BASE RULE (FOR ALL HEALTHY SHAKES)
• Always fruit puree swirl inside glass first
• Pour shake slowly  
• Top with yogurt dollop
• Final topping = product-specific garnish
________________________________________
⭐ PRO CAFÉ GARNISH RULES (HEALTHY)
✔ Vibrant colors = fresh appeal
✔ Use 3 elements max (clean look)
✔ Rim fruit slice = premium
✔ Visible through delivery lid
✔ Market "Superfood Boost" 
________________________________________
🔥 QUICK PREMIUM UPGRADE (SELL HIGH ₹)
• Add protein powder scoop (+₹30–₹50)
• Add superfood mix (chia/flax) (+₹40)
• Add collagen peptides (+₹50–₹80)
• Extra fresh fruit top (+₹20–₹30)
`
}
,

  {
    category: 'tea',
    sauce: 'N/A',
    fillings: 'N/A',
    method: `PRO CAFÉ TIPS
✔ Always serve chai hot & fresh
✔ Use kulhad / glass / paper cup based on branding
✔ For iced tea → always clear + refreshing look
`
  },

  {
    category: 'egg',
    sauce: 'Ketchup, Mayo, Chilli Sauce',
    fillings: 'Boiled, Omelette, Scrambled',
    method: `BASE PREP (VERY IMPORTANT)
• Boiled Eggs
• Place eggs in water → boil 8–10 min
• Cool → peel → slice
________________________________________
• Scrambled Egg Base
• Eggs + salt + pepper → whisk well
________________________________________
• Omelette Base
• Eggs + salt + onion + chilli → mix
`
  }
];



const seedMethods = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Method.deleteMany({});
    console.log('🗑️ Cleared methods');

    // Your data array (shakes, sandwiches, salad, etc.)
    const result = await Method.insertMany(METHODS_DATA);
    console.log(`✅ Seeded ${result.length} methods!`);
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedMethods();