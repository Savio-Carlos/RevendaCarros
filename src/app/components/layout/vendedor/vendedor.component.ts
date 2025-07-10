import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vendedor',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './vendedor.component.html',
  styleUrl: './vendedor.component.scss'
})
export class VendedorComponent {
  authService = inject(AuthService); // Injete

  logout(): void { // Adicione o método
    this.authService.logout();
  }
}
