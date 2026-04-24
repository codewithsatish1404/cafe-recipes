import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
 selector:'app-login',
 standalone:true,
 imports:[
  CommonModule,
  FormsModule,
  RouterLink
 ],
 templateUrl:'./login.html',
 styleUrl:'./login.scss'
})
export class Login {

email='';
password='';
loading=false;

constructor(
 private auth:AuthService,
 private router:Router
){}


login(form:NgForm){

if(form.invalid || this.loading){
 return;
}

this.loading=true;

this.auth.login({
 email:this.email.trim(),
 password:this.password
})
.subscribe({

next:(res)=>{

this.loading=false;

/* auth service already stores:
   token
   user
   admin role
*/

Swal.fire({
 icon:'success',
 title:'Login Successful',
 timer:1500,
 showConfirmButton:false
});

form.resetForm();

this.router.navigateByUrl(
 '/',
 {replaceUrl:true}
);

},

error:(err)=>{

this.loading=false;

Swal.fire({
 icon:'error',
 title:'Login Failed',
 text:
 err?.error?.message ||
 'Invalid credentials'
});

this.password='';

form.controls['password']
?.reset();

}

});

}

}