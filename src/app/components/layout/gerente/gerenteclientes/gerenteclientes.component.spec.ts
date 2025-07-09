import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteclientesComponent } from './gerenteclientes.component';

describe('GerenteclientesComponent', () => {
  let component: GerenteclientesComponent;
  let fixture: ComponentFixture<GerenteclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteclientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
