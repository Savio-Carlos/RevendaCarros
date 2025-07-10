import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-mecanico',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './mecanico.component.html',
  styleUrl: './mecanico.component.scss'
})
export class MecanicoComponent {
  authService = inject(AuthService); // Injete

  logout(): void { // Adicione o método
    this.authService.logout();
  }
}
