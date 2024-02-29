import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleurlService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const userRole = this.authService.getRole();
    if (userRole === 'manager') {
      this.router.navigate(['google.com']);
    } else {
      this.router.navigate(['/client/historique']);
    }
    return false; // Retourne false pour indiquer que la navigation est interdite
  }
}
