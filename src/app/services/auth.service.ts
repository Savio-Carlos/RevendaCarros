import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private userRole: string | null = null; 
  private userId: number | null = null; // mock id (ex.: idFuncionario quando vendedor)
  
  login(usuario: string, senha: string):boolean {
    if (usuario === 'gerente' && senha === 'gerente') {
      this.userRole = 'gerente';
      this.userId = 10; // mock
      this.router.navigate(['/gerente']);
      return true;
    } else if (usuario === 'vendedor' && senha === 'vendedor') {
      this.userRole = 'vendedor';
      this.userId = 45; // mock idFuncionario
      this.router.navigate(['/vendedor']);
      return true;
    } else if (usuario === 'cliente' && senha === 'cliente') {
      this.userRole = 'cliente';
      this.userId = 2000; // mock idCliente
      this.router.navigate(['/cliente']);
      return true;
    } else if (usuario === 'mecanico' && senha === 'mecanico') {
      this.userRole = 'mecanico';
      this.userId = 30; // mock
      this.router.navigate(['/mecanico']);
      return true;
    }

    this.userRole = null;
    this.userId = null;
    return false;
  }

  logout(): void {
    this.userRole = null;
    this.userId = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.userRole !== null;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getFuncionarioId(): number | null {
    return this.userRole === 'vendedor' ? this.userId : null;
  }
}