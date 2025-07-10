import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cliente',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {
  authService = inject(AuthService); // Injete

  logout(): void { // Adicione o método
    this.authService.logout();
  }
}
