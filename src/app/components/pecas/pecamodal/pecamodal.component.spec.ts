import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecamodalComponent } from './pecamodal.component';

describe('PecamodalComponent', () => {
  let component: PecamodalComponent;
  let fixture: ComponentFixture<PecamodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecamodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
