import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosdetailsComponent } from './servicosdetails.component';

describe('ServicosdetailsComponent', () => {
  let component: ServicosdetailsComponent;
  let fixture: ComponentFixture<ServicosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
