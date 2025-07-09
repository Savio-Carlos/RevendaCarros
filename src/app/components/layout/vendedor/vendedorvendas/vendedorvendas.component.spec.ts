import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorvendasComponent } from './vendedorvendas.component';

describe('VendedorvendasComponent', () => {
  let component: VendedorvendasComponent;
  let fixture: ComponentFixture<VendedorvendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorvendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
