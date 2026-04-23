import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

 
 name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) return;

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully',
          text: 'Please login now',
          confirmButtonColor: '#667eea'
        });

        form.resetForm(); // ✅ reset after success
        this.router.navigate(['/login']);
      },

      error: (err) => {
        const message = err?.error?.message || 'Registration failed';

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: message
        });

        // ✅ reset after error (keep email optional)
        form.resetForm({
          name: '',
          email: this.email, // keep email for UX
          password: ''
        });
      }
    });
  }

}
