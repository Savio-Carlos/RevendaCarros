import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteequipeComponent } from './gerenteequipe.component';

describe('GerenteequipeComponent', () => {
  let component: GerenteequipeComponent;
  let fixture: ComponentFixture<GerenteequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteequipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
