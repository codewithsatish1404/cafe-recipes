import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
 selector: 'app-login',
 standalone: true,
 imports: [
   CommonModule,
   FormsModule
 ],
 templateUrl: './login.html',
 styleUrl: './login.scss'
})
export class Login {

email = '';
password = '';
loading = false;

constructor(
 private auth: AuthService,
 private router: Router
){}

login(form: NgForm) {

 console.log('login fired');

 if (form.invalid || this.loading) return;

 this.loading = true;

 this.auth.login({
   email: this.email,
   password: this.password
 }).subscribe({

   next: (res) => {
     this.loading = false;

     Swal.fire({
       icon: 'success',
       title: 'Login Successful',
       timer: 1200,
       showConfirmButton: false
     });

     // IMPORTANT: ensure navbar updates before redirect UI
     this.router.navigate(['/']);

   },

   error: (err) => {
     this.loading = false;

     console.error('Login error:', err);

     Swal.fire({
       icon: 'error',
       title: 'Login Failed',
       text: err?.error?.message || 'Invalid credentials'
     });

     this.password = '';
     form.controls['password']?.reset();
   }

 });

}

}