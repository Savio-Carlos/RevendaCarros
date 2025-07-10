import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gerente',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './gerente.component.html',
  styleUrl: './gerente.component.scss'
})
export class GerenteComponent {
  authService = inject(AuthService); // Injete

  logout(): void { // Adicione o método
    this.authService.logout();
  }
}
