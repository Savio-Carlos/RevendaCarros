import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecasfilterComponent } from './pecasfilter.component';

describe('PecasfilterComponent', () => {
  let component: PecasfilterComponent;
  let fixture: ComponentFixture<PecasfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecasfilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecasfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
