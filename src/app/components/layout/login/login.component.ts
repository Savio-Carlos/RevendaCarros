import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router, RouterOutlet } from '@angular/router';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms'
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule,FormsModule, MenuComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if (this.usuario == 'gerente' && this.senha == 'gerente'){
      this.router.navigate(['gerente/carros'])
    }
    else if (this.usuario == 'cliente' && this.senha == 'cliente'){
      this.router.navigate(['cliente/carros'])
    }
    else if (this.usuario == 'mecanico' && this.senha == 'mecanico'){
      this.router.navigate(['mecanico/carros'])
    }
    else if (this.usuario == 'vendedor' && this.senha == 'vendedor'){
      this.router.navigate(['vendedor/carros'])
    }
    else alert('Usuario e/ou senha incorretos!')
  }
}
