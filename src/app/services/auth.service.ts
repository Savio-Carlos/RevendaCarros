import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private userRole: string | null = null; 
  
  login(usuario: string, senha: string):boolean {
    if (usuario === 'gerente' && senha === 'gerente') {
      this.userRole = 'gerente';
      this.router.navigate(['/gerente']);
      return true;
    } else if (usuario === 'vendedor' && senha === 'vendedor') {
      this.userRole = 'vendedor';
      this.router.navigate(['/vendedor']);
      return true;
    } else if (usuario === 'cliente' && senha === 'cliente') {
      this.userRole = 'cliente';
      this.router.navigate(['/cliente']);
      return true;
    } else if (usuario === 'mecanico' && senha === 'mecanico') {
      this.userRole = 'mecanico';
      this.router.navigate(['/mecanico']);
      return true;
    }

    this.userRole = null;
    return false;
  }

  logout(): void {
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.userRole !== null;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}