import { CommonModule, JsonPipe } from '@angular/common';  // ✅ JsonPipe added
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // ✅ HttpClient only
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-setup',
  standalone: true,  
  imports: [CommonModule], 
  templateUrl: './setup.html',
  styleUrls: ['./setup.scss']  // ✅ plural
})
export class Setup {

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

// UI labels
categoryLabels: Record<string, string> = {
  'hot-coffee':  '☕ Hot Coffee',
  'cold-coffee': '🥤Cold Coffee',
  'sandwiches': '🥪 Sandwiches',
  'burger': '🍔 Burgers',
  'pizza': '🍕 Pizza',
  'roll': '🌯 Rolls',
  'beverage': '🥤 Milkshakes',
  'mocktails': '🍹 Mocktails',
  'pasta': '🍝 Pasta',
  'fries': '🍟 Fries',
  'salad': '🥗 Salads',
  'shakes': '🥛 Healthy Shakes',
  'tea': '🍵 Tea',
  'egg': '🍳 Egg Dishes'
};

  // default selected category
  private selectedCategory$ = new BehaviorSubject<string>('hot-coffee');

  // expose selected category for UI highlight (optional)
  selected$ = this.selectedCategory$.asObservable();

  // main data stream
  data$ = this.selectedCategory$.pipe(
    switchMap(category =>
      this.http.get<any>('http://localhost:3000/api/methods').pipe(
        map(res => res[category]) // 👈 pick only selected category
      )
    )
  );

  constructor(private http: HttpClient) {}

  selectCategory(category: string) {
    this.selectedCategory$.next(category);
  }
formatList(text: string): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map(line => line.replace('•', '').trim())
    .filter(line => line.length);
}
}
