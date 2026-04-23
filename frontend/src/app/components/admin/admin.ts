import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, filter, of, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { RecipeService } from '../../services/recipe-service';
import { Recipe, RecipeApiResponse } from '../../models/recipe.model';
declare var bootstrap: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // 👈 already set to OnPush
})
export class Admin {
  // signals
  search = signal('');
  selectedCategory = signal<string>('');

  // state
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  private searchSubject = new Subject<string>();

  private page = 1;
  private readonly limit = 12;

  loading = false;
  hasMore = true;

  private recipeService = inject(RecipeService);
  private router = inject(Router);

  // form
  recipeForm!: FormGroup;
  showForm = false;

  // edit state
  isEditMode = false;
  editingRecipeId: string | null = null;

  deletingId: string | null = null;

  categories: string[] = [
    'hot-coffee', 'cold-coffee', 'sandwiches', 'burgers', 'rolls-wraps',
    'milkshakes', 'pasta', 'fries-sides', 'salads', 'tea', 'egg-items'
  ];

  constructor(private fb: FormBuilder) {
    // search stream
    this.searchSubject.pipe(
      debounceTime(400),
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap((term: string) => {
        const trimmed = term.trim();
        if (!trimmed) {
          this.loading = false;
          this.recipesSubject.next([]);
          this.page = 1;
          this.hasMore = true;
          return of({ success: true, data: [] } as RecipeApiResponse);
        }
        this.loading = true;
        this.page = 1;
        this.hasMore = true;
        this.recipesSubject.next([]);
        return this.recipeService.getRecipes(
          this.page,
          this.limit,
          trimmed,
          this.selectedCategory()
        );
      })
    ).subscribe({
      next: (res: RecipeApiResponse) => {
        const data = res?.data || [];
        if (!this.search().trim()) return;
        this.recipesSubject.next(data);
        this.page++;
        this.loading = false;
        this.hasMore = data.length === this.limit;
      },
      error: () => this.loading = false
    });
  }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      category: ['', Validators.required],
      description: ['', Validators.required],
      regular: [null, Validators.required],
      prepTime: [''],
      cookTime: [''],
      serving: [1],
      ingredients: [''],
      sauce: [''],
      filling: [''],
      preparation: [''],
      note: [''],
      isVeg: [true]
    });

  }
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ---------- SEARCH ----------
  private lastSearch = '';

  onSearch(value: string): void {
    this.search.set(value);
    const term = value.trim();
    if (!term) {
      this.recipesSubject.next([]);
      this.page = 1;
      this.hasMore = true;
      this.loading = false;
      return;
    }
    this.searchSubject.next(term);
    if (value === this.lastSearch) return;
    this.lastSearch = value;
    this.searchSubject.next(value);
  }

  // ---------- ADD ----------
  openAddForm() {
    this.isEditMode = false;
    this.editingRecipeId = null;
    this.recipeForm.reset();
    this.showForm = true;
  }

  // ---------- EDIT ----------
  editRecipe(recipe: Recipe) {
    this.isEditMode = true;
    this.editingRecipeId = recipe._id;
    this.showForm = true;
    this.imageBase64 = recipe.image;
    this.recipeForm.patchValue({
      name: recipe.name,
      image: recipe.image,
      category: recipe.category,
      description: recipe.description,
      regular: recipe.price?.regular,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      serving: recipe.serving,
      ingredients: recipe.ingredients?.join(', '),
      sauce: recipe.sources?.sauce,
      filling: recipe.sources?.filling,
      preparation: recipe.preparation?.join(', '),
      note: recipe.note,
      isVeg: recipe.isVeg
    });
  }
  imageBase64: string = '';

  closeForm() {
    this.showForm = false;
    this.isEditMode = false;
    this.editingRecipeId = null;
    this.recipeForm.reset();
    this.imageBase64 = ''; // ✅ reset image
  }

  refreshList() {
    const currentSearch = this.search().trim();
    if (currentSearch) {
      this.searchSubject.next(currentSearch);
    } else {
      this.recipesSubject.next([]);
    }
  }

  // ---------- CREATE ----------
  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      Swal.fire('Invalid', 'Fill required fields', 'error');
      return;
    }
    if (!this.selectedImageBase64) {
      Swal.fire('Image Required', 'Please select image', 'warning');
      return;
    }
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      Swal.fire('Invalid', 'Fill required fields', 'error');
      return;
    }
    const v = this.recipeForm.value;
    const payload = {
      name: v.name,
      image: this.selectedImageBase64, // ✅ Base64
      category: v.category,
      description: v.description,
      price: { regular: v.regular },
      prepTime: v.prepTime,
      cookTime: v.cookTime,
      serving: v.serving,
      ingredients: v.ingredients?.split(',').map((i: string) => i.trim()) || [],
      sources: {
        sauce: v.sauce,
        filling: v.filling
      },
      preparation: v.preparation?.split(',').map((s: string) => s.trim()) || [],
      note: v.note,
      isVeg: v.isVeg
    };
    this.recipeService.addRecipe(payload).subscribe({
      next: () => {
        Swal.fire('Success', 'Recipe added', 'success');
        this.closeForm();
        this.selectedImageBase64 = null;
      },
      error: () => {
        Swal.fire('Error', 'Failed to add recipe', 'error');
      }
    });
  }

  // ---------- UPDATE ----------
  onUpdate(): void {
    if (this.recipeForm.invalid || !this.editingRecipeId) {
      this.recipeForm.markAllAsTouched();
      Swal.fire('Invalid', 'Fill required fields', 'error');
      return;
    }
    const v = this.recipeForm.value;
    const finalImage = this.imageBase64 || v.image;
    const payload = {
      name: v.name,
      image: finalImage,
      category: v.category,
      description: v.description,
      price: { regular: v.regular },
      prepTime: v.prepTime,
      cookTime: v.cookTime,
      serving: v.serving,
      ingredients: v.ingredients
        ? v.ingredients.split(',').map((i: string) => i.trim())
        : [],
      sources: {
        sauce: v.sauce,
        filling: v.filling
      },
      preparation: v.preparation
        ? v.preparation.split(',').map((s: string) => s.trim())
        : [],
      note: v.note,
      isVeg: v.isVeg
    };
    this.loading = true;
    this.recipeService.updateRecipe(this.editingRecipeId, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const v = this.recipeForm.value;
          const updatedList = this.recipesSubject.value.map(r => {
            if (r._id === this.editingRecipeId) {
              return {
                ...r,
                name: v.name,
                image: this.imageBase64 || r.image,
                category: v.category,
                description: v.description,
                price: { regular: v.regular },
                prepTime: v.prepTime,
                cookTime: v.cookTime,
                serving: v.serving,
                ingredients: v.ingredients
                  ? v.ingredients.split(',').map((i: string) => i.trim())
                  : [],
                sources: {
                  sauce: v.sauce,
                  filling: v.filling
                },
                preparation: v.preparation
                  ? v.preparation.split(',').map((s: string) => s.trim())
                  : [],
                note: v.note,
                isVeg: v.isVeg
              };
            }
            return r;
          });
          this.recipesSubject.next(updatedList); // ⚡ instant update
          Swal.fire('Updated', 'Recipe updated successfully', 'success');
          this.closeForm();
          this.imageBase64 = '';
          this.selectedImageBase64 = null;
          this.loading = false;
          setTimeout(() => this.refreshList(), 1000);
        },
        error: (err) => {
          Swal.fire('Error', err?.error?.message || 'Update failed', 'error');
          this.loading = false;
        }
      });
  }

  // ---------- DELETE ----------
  pendingDelete: Recipe | null = null;
  undoTimeout: any;

  deleteRecipe(recipe: Recipe) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete recipe "${recipe.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (!result.isConfirmed) return;
      const currentList = this.recipesSubject.value;
      const index = currentList.findIndex(r => r._id === recipe._id);
      this.recipesSubject.next(
        currentList.filter(r => r._id !== recipe._id)
      );
      this.pendingDelete = recipe;
      const timeout = setTimeout(() => {
        if (this.pendingDelete) {
          this.confirmDeleteFromServer(recipe);
          this.pendingDelete = null;
        }
      }, 5000);
      Swal.fire({
        title: 'Recipe deleted',
        text: 'Click Undo to restore',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Undo',
        cancelButtonText: 'OK'
      }).then((undoResult) => {
        if (undoResult.isConfirmed && this.pendingDelete) {
          clearTimeout(timeout);
          const list = this.recipesSubject.value;
          const restored = [
            ...list.slice(0, index),
            this.pendingDelete,
            ...list.slice(index)
          ];
          this.recipesSubject.next(restored);
          this.pendingDelete = null;
        }
      });
    });
  }

  confirmDeleteFromServer(recipe: Recipe) {
    this.deletingId = recipe._id;
    this.recipeService.deleteRecipe({ id: recipe._id }).subscribe({
      next: () => {
        this.deletingId = null;
        Swal.fire('Deleted permanently', '', 'success');
      },
      error: () => {
        this.deletingId = null;
        this.recipesSubject.next([
          recipe,
          ...this.recipesSubject.value
        ]);
        Swal.fire('Error', 'Delete failed', 'error');
      }
    });
  }

  // ---------- HELPERS ----------
  buildPayload(v: any) {
    return {
      name: v.name,
      image: v.image,
      category: v.category,
      description: v.description,
      price: { regular: v.regular },
      prepTime: v.prepTime,
      cookTime: v.cookTime,
      serving: v.serving,
      ingredients: v.ingredients
        ? v.ingredients.split(',').map((i: string) => i.trim())
        : [],
      sources: {
        sauce: v.sauce,
        filling: v.filling
      },
      preparation: v.preparation
        ? v.preparation.split(',').map((s: string) => s.trim())
        : [],
      note: v.note,
      isVeg: v.isVeg
    };
  }

  trackByFn(index: number, recipe: Recipe): string {
    return recipe._id;
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe-details', recipe._id], {
      state: { recipe }
    });
  }

  get recipeCount(): number {
    return this.recipesSubject.value.length;
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  selectedImageBase64: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      Swal.fire('Invalid File', 'Only images allowed', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire('Too Large', 'Max 2MB image allowed', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        this.imageBase64 = compressedBase64;
        this.selectedImageBase64 = compressedBase64;
        this.imagePreview = compressedBase64;
      };
    };
    reader.readAsDataURL(file);
  }
}
