import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  constructor(private auth: AuthService) {}

ngOnInit() {
  this.auth.getMe().subscribe({
    next: (user) => this.auth.setUser(user),
    error: (err) => {
      if (err.status !== 401) {
        console.error(err); // only log real errors
      }
      this.auth.setUser(null);
    }
  });
}
}
