import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteveiculosComponent } from './gerenteveiculos.component';

describe('GerenteveiculosComponent', () => {
  let component: GerenteveiculosComponent;
  let fixture: ComponentFixture<GerenteveiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteveiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteveiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
