import {
 Component,
 ChangeDetectionStrategy
} from '@angular/core';

import {
 CommonModule
} from '@angular/common';

import {
 Router,
 RouterLink
} from '@angular/router';

import {
 AuthService
} from '../../services/auth-service';

@Component({
 selector:'app-navbar',
 standalone:true,
 imports:[
  CommonModule,
  RouterLink
 ],
 templateUrl:'./navbar.html',
 styleUrls:['./navbar.scss'],

 // changed from OnPush
 changeDetection:
 ChangeDetectionStrategy.Default
})
export class Navbar {

isMenuOpen=false;

constructor(
 public auth:AuthService,
 private router:Router
){}

toggleMenu(){
 this.isMenuOpen=!this.isMenuOpen;
}

closeMenu(){
 this.isMenuOpen=false;
}

logout(){

this.auth.logout().subscribe({
 next:()=>{

  this.closeMenu();

  this.router.navigate(
   ['/login']
  );

 },
 error:()=>{

 // still force logout locally
 localStorage.removeItem(
  'token'
 );

 this.auth.setUser(null);

 this.router.navigate(
  ['/login']
 );

 }
});

}

}