export interface RecipeApiResponse {
  success: boolean;
  data: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: { 
    regular: number;
    small?: number;
    large?: number;
  };
  prepTime: string;
  cookTime: string;
  serving: number;
  category: string;
  
  ingredients: string[];
  sources: {
    sauce: string;
    filling: string;
  };
  preparation: string[];
  note?: string;
  isVeg: boolean;
  
  // ✅ Mongoose timestamps
  createdAt?: string;
  updatedAt?: string;
}
