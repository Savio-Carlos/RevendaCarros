import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromodalComponent } from './registromodal.component';

describe('RegistromodalComponent', () => {
  let component: RegistromodalComponent;
  let fixture: ComponentFixture<RegistromodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistromodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistromodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
