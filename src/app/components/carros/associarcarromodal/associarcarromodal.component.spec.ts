import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarcarromodalComponent } from './associarcarromodal.component';

describe('AssociarcarromodalComponent', () => {
  let component: AssociarcarromodalComponent;
  let fixture: ComponentFixture<AssociarcarromodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociarcarromodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociarcarromodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
