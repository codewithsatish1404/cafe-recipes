import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetails {

   recipe:any;
  recipeId!:string;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {

    this.recipeId = this.route.snapshot.paramMap.get('id')!;

    // data passed from navigation
    this.recipe = history.state.recipe;

    console.log("Recipe ID:", this.recipeId);
    console.log("Recipe Data:", this.recipe);
  }
formatCategory(category: string): string {
  if (!category) return '';
  return category.replace(/-/g, ' ')
                 .replace(/\b\w/g, c => c.toUpperCase());
}

assembleTime: string = 'Average time: 60–90 seconds per item';

assembleConfig: Record<string, (recipe: any) => string[]> = {

 sandwiches: (recipe: any) => {
  const sauce = recipe?.sources?.sauce;
  const filling = recipe?.sources?.filling;

  const steps: string[] = [
    'Bread + light butter',
    sauce ? `Spread ${sauce}` : 'Apply sauce evenly',
    'Add lettuce layer',
    filling ? `Add ${filling}` : 'Add main filling',
    'Add cheese slice',
    'Add vegetables (onion, tomato, cucumber)',
    'Close with top bread',
    recipe?.isHot ? 'Grill until crispy' : 'Serve fresh'
  ];

  return steps.map((step, i) => `${i + 1}. ${step}`);
},

  burger: (recipe: any) => {
  const sauce = recipe?.sources?.sauce;
  const filling = recipe?.sources?.filling;

  const steps: string[] = [
    'Toast bun with lightly butter',
    sauce ? `Apply ${sauce} on bun` : 'Apply sauce on bun',
    'Add lettuce layer',
    filling ? `Add ${filling} (grilled)` : 'Add main patty (grilled)',
    'Place cheese slice over patty (melt slightly)',
    'Add vegetables (onion, tomato, pickles)',
    'Close with top bun (buttered side down)',
    'Sprinkle sesame seeds on top bun',
    'Cut (if needed) and plate'
  ];

  return steps.map((step, i) => `${i + 1}. ${step}`);
},
pizza: (recipe: any) => {
  const sauce = recipe?.sources?.sauce || 'pizza sauce';
  const filling = recipe?.sources?.filling;

  return [
    `Pizza Base Preparation :-`,
    'Activate yeast (warm water + sugar + yeast → 5–10 min)',
    'Add maida, salt, and oil',
    'Knead into soft dough (8–10 min)',

    `Pizza Sauce Preparation :-`,
    'Heat olive oil and sauté garlic',
    'Add tomato puree, oregano, chilli flakes',

    `Final Assembly :-`,
    'Flatten dough into pizza base',
    `Spread ${sauce} evenly`,
    filling ? `Add ${filling}` : 'Add toppings',
    'Bake and serve hot'
  ];
},
pasta: (recipe: any) => {
  const sauce = recipe?.sources?.sauce;
  const filling = recipe?.sources?.filling;

  return [

    `BASE PREPARATION :- `,
    'Boil water with salt',
    'Add pasta and cook for 8–10 minutes (al dente)',
    'Drain pasta and toss with a little oil',
    'Keep pasta aside',

    `Assemble :-`,
    sauce ? `Prepare ${sauce}` : 'Prepare sauce base',
    filling ? `Add ${filling}` : 'Add vegetables or chicken',
    'Mix cooked pasta with sauce',
    'Add cheese and mix well',
    recipe?.isBaked ? 'Bake until cheese melts (optional)' : 'Serve hot'
  ];
},
roll: (recipe: any) => {
  const sauce = recipe?.sources?.sauce;
  const filling = recipe?.sources?.filling;

  return [
    'Heat wrap or roti',
    sauce ? `Apply ${sauce}` : 'Apply sauce evenly',
    filling ? `Add ${filling} in center` : 'Add filling in center',
    'Add onion and vegetables',
    'Add cheese (optional)',
    'Roll tightly (wrap properly)',
    'Toast lightly on pan',
    'Serve hot'
  ];
},
fries: (recipe: any) => {
  const seasoning = recipe?.sources?.seasoning;

  return [
    'Cut potatoes into fries and soak in water',
    'First fry at low temperature (cook till soft)',
    'Remove and rest for a few minutes',
    'Second fry at high temperature (until crispy and golden)',
    seasoning ? `Add ${seasoning}` : 'Season with salt or spices',
    'Toss well and serve immediately'
  ];
},
egg: (recipe: any) => {

  return [

    `🔹 BOILED EGG BASE` ,
    'Place eggs in water and boil for 8–10 minutes',
    'Cool, peel, and slice eggs',

    ` 🔹 SCRAMBLED EGG BASE`  ,
   'Crack eggs into a bowl',
    'Whisk with salt until well combined',
    'Pour into a buttered pan on low heat',
    'Gently fold while cooking',
    'Cook until soft curds form (do not overcook)',
    'Plate hot and finish with pepper and herbs',

    `🔹 OMELETTE BASE`,
    'Crack eggs into bowl',
    'Add salt, chopped onion, and chilli',
    'Mix well'
  ];
}
,
beverage: (recipe: any) => {
  const flavor = recipe?.sources?.flavor;

  return [

    `🔹 BASE PREPARATION `,
    'Add chilled milk to blender',
    'Add ice cream scoop',
    flavor ? `Add ${flavor} syrup or flavor` : 'Add sugar or syrup (as needed)',
    'Add ice cubes (optional)',

    `🔹 BLENDING `,

    'Blend for 20–30 seconds until smooth and thick',

    ` 🔹 SERVING `, 
    'Pour into glass',
    'Garnish and serve immediately'
  ];
}
};


getAssembleSteps(recipe: any): string[] {
  const category = recipe?.category?.toLowerCase();

  const handler = this.assembleConfig[category];

  return handler ? handler(recipe) : [];
}
showAssembleSection(recipe: any): boolean {
  return !!this.assembleConfig[recipe?.category?.toLowerCase()];
}

// ✅ TRACKBY (PERFORMANCE)
trackByIndex(index: number) {
  return index;
}

}