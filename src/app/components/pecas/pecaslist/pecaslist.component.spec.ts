import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaslistComponent } from './pecaslist.component';

describe('PecaslistComponent', () => {
  let component: PecaslistComponent;
  let fixture: ComponentFixture<PecaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
