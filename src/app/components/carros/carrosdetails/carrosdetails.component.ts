import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { CarroService } from '../../../services/carro.service';
import { Carro } from '../../../models/carro';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContatoModalComponent } from '../../contatomodal/contatomodal.component';

@Component({
  selector: 'app-carrosdetails',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent implements OnInit{
  carro?: Carro;
  
  constructor(
  private route: ActivatedRoute,
  private carroService: CarroService,
  private modalService: NgbModal 
  ) {}

  ngOnInit(): void {
  // 1. Get the 'chassi' from the URL parameters
  const chassiParam = this.route.snapshot.paramMap.get('chassi');
    if (chassiParam) {
      // 2. Use the chassi to fetch the car data from the service
      this.carroService.getCarroByChassi(chassiParam).subscribe((data: Carro) => {
        this.carro = data;
      });
    }
  }

    openContactModal() {
    // This opens the ContatoModalComponent as a modal dialog
    const modalRef = this.modalService.open(ContatoModalComponent);

    // You can optionally pass data to the modal or handle results
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

}
