import { Component, signal, effect, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe-service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Recipe, RecipeApiResponse } from '../../models/recipe.model';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollDirective],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.scss']
})
export class RecipeList implements OnInit {


  // --- Signals ---
  search = signal('');
  category = signal(''); // This already exists

  // Selected category for UI chips
  selectedCategory = signal<string>('');

  // --- Recipes state ---
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  private page = 1;
  private readonly limit = 12;
  loading = false;
  hasMore = true;

  // **ADDED: Dynamic categories from API data**
  categories: string[] = [
    'hot-coffee',
    'cold-coffee',
    'sandwiches',
    'burger',
    'pizza',
    'roll',
    'beverage',
    'mocktails',
    'pasta',
    'fries',
    'salad',
    'shakes',
    'tea',
    'egg'
  ];

  // getCategoryIcon(category: string): string {
  //   const icons: { [key: string]: string } = {
  //     'hot-coffee': '☕',
  //     'cold-coffee': '🥤',
  //     'veg-sandwich': '🥪',    // SQUARE GREEN + sandwich = VEG
  //     'nonveg-sandwich': '🥪', // SQUARE RED + sandwich = NONVEG
  //     'veg-burger': '🍔',
  //     'nonveg-burger': '🍔',
  //     'rolls-wraps': '🌯',
  //     'milkshakes': '🍼',
  //     'pasta': '🍝',
  //     'fries-sides': '🍟',
  //     'salads': '🥗',
  //     'tea': '🍵',
  //     'egg-items': '🥚'
  //   };
  //   return icons[category.toLowerCase()] || '';
  // }



  // **ADDED: All recipes storage for client-side filtering**
  private allRecipes: Recipe[] = [];

  // --- Live search ---
  private searchSubject = new Subject<string>();

  private recipeService = inject(RecipeService);

  constructor(private router: Router) {
    // --- Live search ---
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.loading = true;
        this.page = 1;
        this.hasMore = true;
        this.recipesSubject.next([]);
        // **UPDATED: Pass selectedCategory instead of empty category signal**
        return this.recipeService.getRecipes(this.page, this.limit, term, this.selectedCategory());
      })
    ).subscribe({
      next: (res) => {
        this.recipesSubject.next(res.data || []);
        this.allRecipes = res.data || []; // **ADDED: Store all for filtering**
        this.hasMore = (res.data?.length === this.limit);
        this.page++;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  // **FIX loadRecipes() - don't overwrite hardcoded categories:**
  loadRecipes(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    this.recipeService.getRecipes(this.page, this.limit, this.search(), this.selectedCategory())
      .subscribe({
        next: (res: RecipeApiResponse) => {
          const current = this.recipesSubject.value;
          const newRecipes = res.data || [];
          this.recipesSubject.next([...current, ...newRecipes]);
          this.allRecipes = [...this.allRecipes, ...newRecipes];

          // **REMOVED: this.updateCategoriesFromData(); - don't overwrite**

          this.hasMore = (newRecipes.length === this.limit);
          this.page++;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }




  // --- Live search handler ---
  onSearch(value: string): void {
    this.search.set(value);
    this.searchSubject.next(value);
  }

  // **UPDATED: Category select now triggers API filter + client filter**
  onCategorySelect(cat: string): void {
    if (this.selectedCategory() === cat) {
      this.selectedCategory.set(''); // deselect
    } else {
      this.selectedCategory.set(cat); // select
    }

    // **ADDED: Reset and reload with new category filter**
    this.page = 1;
    this.hasMore = true;
    this.recipesSubject.next([]);
    this.loadRecipes();
  }

  // **UPDATED: Client-side filter works with your existing logic**
  get filteredRecipes(): Recipe[] {
    const cat = this.selectedCategory();
    const searchTerm = this.search().toLowerCase();

    return this.recipesSubject.value.filter(recipe => {
      const matchesCategory = cat === 'all' || cat === '' ? true : recipe.category === cat;
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }

  // Clear all filters
  clearFilters(): void {
    this.search.set('');
    this.selectedCategory.set(''); // **UPDATED: Clear category too**
    this.category.set('');
    this.resetAndLoad();
  }

  private resetAndLoad(): void {
    this.page = 1;
    this.hasMore = true;
    this.recipesSubject.next([]);
    this.loadRecipes();
  }

  trackByFn(index: number, recipe: Recipe): string {
    return recipe._id;
  }

  get recipeCount(): number {
    return this.recipesSubject.value.length;
  }
 
  viewRecipe(recipe: any) {
  this.router.navigate(['/recipe-details', recipe._id], {
    state: { recipe }
  });
}

onImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  img.classList.add('loaded');
}

selectedSize: string = 'regular';
trackByIndex(index: number) {
  return index;
}
}