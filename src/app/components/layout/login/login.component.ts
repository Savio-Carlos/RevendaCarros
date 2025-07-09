import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms'
import { MenuComponent } from '../menu/menu.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //
import { RegisterModalComponent } from '../registromodal/registromodal.component';

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

  logar(){
    if (this.usuario == 'gerente' && this.senha == 'gerente'){
      this.router.navigate(['gerente'])
    }
    else if (this.usuario == 'cliente' && this.senha == 'cliente'){
      this.router.navigate(['cliente'])
    }
    else if (this.usuario == 'mecanico' && this.senha == 'mecanico'){
      this.router.navigate(['mecanico'])
    }
    else if (this.usuario == 'vendedor' && this.senha == 'vendedor'){
      this.router.navigate(['vendedor'])
    }
    else alert('Usuario e/ou senha incorretos!')
  }

    openRegisterModal() {
    this.modalService.open(RegisterModalComponent);
  }
}
