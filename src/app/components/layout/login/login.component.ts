import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms'
import { MenuComponent } from '../menu/menu.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //
import { RegisterModalComponent } from '../registromodal/registromodal.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule,FormsModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);
  modalService = inject(NgbModal);

  authService = inject(AuthService);

  logar() {
    const sucesso = this.authService.login(this.usuario, this.senha);
    if (!sucesso) {
      alert('Usuário e/ou senha incorretos!');
    }
  }

    openRegisterModal() {
    this.modalService.open(RegisterModalComponent);
  }
}
