import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorpecasComponent } from './vendedorpecas.component';

describe('VendedorpecasComponent', () => {
  let component: VendedorpecasComponent;
  let fixture: ComponentFixture<VendedorpecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorpecasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorpecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
