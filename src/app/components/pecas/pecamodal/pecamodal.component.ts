import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Peca } from '../../../models/peca';

@Component({
  selector: 'app-peca-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pecamodal.component.html',
})
export class PecamodalComponent implements OnInit {
  @Input() pecaToEdit?: Peca;

  peca: Peca = new Peca();
  isEditMode = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.pecaToEdit) {
      this.isEditMode = true;
      this.peca = { ...this.pecaToEdit };
    }
  }

  save(): void {
    this.activeModal.close(this.peca);
  }
}