import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component'; // ✅ Importe o Footer

@Component({
  selector: 'app-principal',
  standalone: true, // Adicione standalone: true se ainda não tiver
  imports: [MenuComponent, RouterOutlet, FooterComponent],
  templateUrl: './principal.component.html',
})
export class PrincipalComponent {

}