import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedordashboardComponent } from './vendedordashboard.component';

describe('VendedordashboardComponent', () => {
  let component: VendedordashboardComponent;
  let fixture: ComponentFixture<VendedordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedordashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
