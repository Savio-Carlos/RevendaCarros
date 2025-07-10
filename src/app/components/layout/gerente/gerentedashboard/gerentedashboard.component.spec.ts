import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerentedashboardComponent } from './gerentedashboard.component';

describe('GerentedashboardComponent', () => {
  let component: GerentedashboardComponent;
  let fixture: ComponentFixture<GerentedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerentedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerentedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
