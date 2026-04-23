import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

   email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}


login(form: any) {
  this.auth.login({
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {

      // ✅ Fetch user after login
      this.auth.getMe().subscribe(user => {
        this.auth.setUser(user);

        // ✅ Success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 1500,
          showConfirmButton: false
        });

        this.router.navigate(['/']);
      });

    },

    error: (err) => {
      const message = err?.error?.message || 'Login failed';

      // ❌ Error alert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message
      });

      // ✅ Reset form after error
      form.resetForm();
    }
  });
}

}
