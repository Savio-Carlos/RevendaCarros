import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorcarrosComponent } from './vendedorcarros.component';

describe('VendedorcarrosComponent', () => {
  let component: VendedorcarrosComponent;
  let fixture: ComponentFixture<VendedorcarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorcarrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorcarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
