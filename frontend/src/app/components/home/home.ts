import {
  CommonModule
} from '@angular/common';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { register as registerSwiperElements } from 'swiper/element/bundle';

interface CarouselItem {
  title: string;
  desc: string;
  image: string;
  badge: string;
  badgeClass: string;
  orderLink: string;
  recipeLink: string;
  reverse?: boolean;
}
registerSwiperElements();

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home implements OnInit {


carouselItems: CarouselItem[] = [
  // Slide 1: Normal layout (image left, content right)
  {
    title: 'Velvet Cappuccino',
    desc: 'Microfoam artistry meets Coorg single-origin Arabica. Velvety texture with caramelized sweetness, finished with fresh cinnamon dust.',
    image: '../The Social Impact of Coffee.jpg',
    badge: '☕ Most Popular',
    badgeClass: 'bg-warning text-dark',
    orderLink: '/menu#cappuccino',
    recipeLink: '/recipes#cappuccino'
    // No 'reverse' = normal layout
  },
  
  // Slide 2: REVERSE layout (content left, image right)
  {
  title: 'Iced Cold Brew',
  desc: '18-hour slow steep, flash-chilled perfection. Rich dark chocolate, black cherry notes with creamy mouthfeel. No ice dilution.',
  image: '../cold_coffee_landscape.jpg',
  badge: '🥶 Summer Special',
  badgeClass: 'bg-info text-white',
  orderLink: '/menu#coldbrew',
  recipeLink: '/recipes#coldbrew',
  reverse: true  // ✅ REVERSE
},
  
  // Slide 3: Normal layout
  {
    title: 'Classic Club Sandwich',
    desc: 'Triple decker with grilled chicken, crispy bacon, fresh lettuce, tomatoes and house-made mayo on toasted multigrain.',
    image: '../sandwich_landscape.jpg',
    badge: '🥪 Freshly Made',
    badgeClass: 'bg-success text-white',
    orderLink: '/menu#sandwich',
    recipeLink: '/recipes#sandwich'
  },
  
  // Slide 4: REVERSE layout  
  {
    title: 'Juicy Cheeseburger',
    desc: 'Hand-pressed lamb patty, aged cheddar, caramelized onions, pickles, signature BBQ sauce on brioche bun.',
    image: '../burger_landscape.jpg',
    badge: '🍔 House Favorite',
    badgeClass: 'bg-danger text-white',
    orderLink: '/menu#burger',
    recipeLink: '/recipes#burger',
    reverse: true  // ✅ REVERSE
  },
  
  // Slide 5: Normal layout
  {
    title: 'Margherita Pizza',
    desc: 'Hand-stretched dough, San Marzano tomatoes, fresh mozzarella, basil from terrace garden, finished with EVOO.',
    image: '../pizza_landscape.jpg',
    badge: '🍕 Wood Fired',
    badgeClass: 'bg-warning text-dark',
    orderLink: '/menu#pizza',
    recipeLink: '/recipes#pizza'
  },
  
  // Slide 6: REVERSE layout
  {
    title: 'Creamy Alfredo Pasta',
    desc: 'Fresh egg fettuccine in parmesan cream sauce with mushrooms, garlic confit, cracked pepper and truffle oil.',
    image: '../pasta_landscape.jpg',
    badge: '🍝 Chef Special',
    badgeClass: 'bg-info text-white',
    orderLink: '/menu#pasta',
    recipeLink: '/recipes#pasta',
    reverse: true  // ✅ REVERSE
  },
  
  // Slide 7: Normal layout
  {
    title: 'Crispy Potato Fries',
    desc: 'Hand-cut Kennebec potatoes, double-fried for perfect crunch, served with house-made garlic aioli and ketchup.',
    image: '../fries_landscape.jpg',
    badge: '🥔 Perfect Crunch',
    badgeClass: 'bg-success text-white',
    orderLink: '/menu#fries',
    recipeLink: '/recipes#fries'
  },
  
  // Slide 8: REVERSE layout
  {
    title: 'English Breakfast',
    desc: 'Sunny side eggs, chicken sausage, bacon, baked beans, grilled tomato, mushrooms and toasted sourdough.',
    image: '../half_fry_landscape.jpg',
    badge: '🥚 All Day Breakfast',
    badgeClass: 'bg-warning text-dark',
    orderLink: '/menu#breakfast',
    recipeLink: '/recipes#breakfast',
    reverse: true  // ✅ REVERSE
  },
  
  // Slide 9: Normal layout
  {
    title: 'Virgin Mojito Mocktail',
    desc: 'Fresh mint, lime, soda, cane sugar and crushed ice. Refreshing non-alcoholic classic with garden mint.',
    image: '../mocktail_landscape.jpg',
    badge: '🥤 Refreshing',
    badgeClass: 'bg-info text-white',
    orderLink: '/menu#mocktail',
    recipeLink: '/recipes#mocktail'
  },
  
  // Slide 10: REVERSE layout
  {
    title: 'Quinoa Power Salad',
    desc: 'Organic quinoa, kale, roasted sweet potato, avocado, feta, cranberries, pumpkin seeds with lemon vinaigrette.',
    image: '../salad_landscape.jpg',
    badge: '🥗 Healthy Choice',
    badgeClass: 'bg-success text-white',
    orderLink: '/menu#salad',
    recipeLink: '/recipes#salad',
    reverse: true  // ✅ REVERSE
  },
  
  // Slide 11: Normal layout
  {
    title: 'Masala Chai',
    desc: 'Slow-simmered black tea with cardamom, ginger, cloves, cinnamon, black pepper and fresh milk.',
    image: '../tea_landscape.jpg',
    badge: '🍵 Traditional',
    badgeClass: 'bg-warning text-dark',
    orderLink: '/menu#chai',
    recipeLink: '/recipes#chai'
  }
];


  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  }

   

trackByIndex(index: number): number {
  return index;
}
categories = [
  { title: 'Hot Coffee', image: '../coffee_espresso.jpg' },
  { title: 'Cold Coffee', image: '../cold_coffee.jpg' },
  { title: 'Pizza', image: '../pizza.jpg' },
  { title: 'Burger', image: '../Stanislav Kondrashov _ Burger.jpg' },
  { title: 'Pasta', image: '../pasta.jpg' },
  { title: 'Sandwich', image: '../sandwich.jpg' },
  { title: 'Fries', image: '../fries.jpg' },
  { title: 'Egg Items', image: '../half fry.jpg' }
];
bestsellers = [
  {
    title: 'Cappuccino',
    desc: 'Creamy & rich aroma',
    image: '../cappacino.jpg'
  },
  {
    title: 'Loaded Burger',
    desc: 'Juicy grilled patty',
    image: '../Delicious burger.jpg'
  },
  {
    title: 'Chicken Sandwich',
    desc: 'Delicious stacked sandwich with crispy chicken and fresh vegetables',
    image: '../chicken_sandwich.jpg'
  },
   {
    title: 'Rustic Veggie Pizza',
    desc: 'Mushrooms, Olives & Peppers Delight Bring the cozy Italian ',
    image: '../pizza_aesthetic.jpg'
  },
  {
    title: 'Penne Arrabiata',
    desc: 'Simple. Big Flavors. Iconic:',
    image: '../pasta.jpg'
  },
  {
    title: 'Finger licking Rolls',
    desc: 'Fresh & cheesy',
    image: '../rolls_chicken.jpg'
  }
];
whyChooseUs = [
  {
    title: 'Premium Ingredients',
    desc: `Hand-picked single-origin Arabica from family-owned estates in Coorg's misty hills. We reject 80% of beans that don't meet our standards. 
    Fresh milk delivered daily from local A2 Gir cows within 20km. Spices like cardamom and pepper ground fresh every morning. 
    Our chocolate? 70% single-estate dark from Kerala. Every ingredient tells a story of origin, care, and uncompromising quality.`,
    image: '../beans_landscape.jpg'
  },
  {
    title: 'Freshly Prepared',
    desc: `Slow-roasted in tiny 5kg cast-iron drums over 18 minutes to unlock caramelized notes machine roasting destroys. 
    Pastries laminated by hand with Madagascar vanilla croissants baked at 4 AM. Espresso pulled at 93°C with 25-second extraction. 
    Cold brews steep 18 hours in French press. Every single item crafted fresh-to-order—never pre-made, never reheated, always exceptional.`,
    image: '../prepared_coffee.jpg'
  },
  {
    title: 'Cozy Ambience',
    desc: `Warm reclaimed teak tables polished with beeswax. Hand-thrown ceramic mugs warm your palms. Soft jazz from vinyl records fills the air. 
    Edison bulbs cast golden glow over corners perfect for reading or conversation. Aroma therapy from fresh grounds and citrus peels. 
    Rainy-day window seats with cushions. Every detail creates sanctuary—a space where time slows and coffee moments become memories.`,
    image: '../The Social Impact of Coffee.jpg'
  },
  {
    title: 'Fast Service',
    desc: `Dual workflow: baristas prepped your favorite AeroPress before you walk in. Orders ping instantly to kitchen screens. 
    Milk steaming parallel to grinding. POS system remembers your "usual" with one tap. Average wait: 90 seconds for perfection. 
    Quality never sacrificed—our speed comes from mastery, not corners cut. Your coffee ready before you finish scrolling Instagram.`,
    image: '../fast_service.jpg'
  }
];

storyBgImage2 = '../bean-story.jpg'
storyBgImage = '../beans.jpg'
}