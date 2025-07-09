import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarromodalComponent } from './carromodal.component';

describe('CarromodalComponent', () => {
  let component: CarromodalComponent;
  let fixture: ComponentFixture<CarromodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarromodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarromodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
