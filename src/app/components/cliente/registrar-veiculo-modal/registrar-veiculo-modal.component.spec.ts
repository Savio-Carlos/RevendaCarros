import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVeiculoModalComponent } from './registrar-veiculo-modal.component';

describe('RegistrarVeiculoModalComponent', () => {
  let component: RegistrarVeiculoModalComponent;
  let fixture: ComponentFixture<RegistrarVeiculoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVeiculoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarVeiculoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
