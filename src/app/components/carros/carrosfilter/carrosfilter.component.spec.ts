import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosfilterComponent } from './carrosfilter.component';

describe('CarrosfilterComponent', () => {
  let component: CarrosfilterComponent;
  let fixture: ComponentFixture<CarrosfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosfilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
