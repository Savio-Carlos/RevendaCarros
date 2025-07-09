import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenterelatoriosComponent } from './gerenterelatorios.component';

describe('GerenterelatoriosComponent', () => {
  let component: GerenterelatoriosComponent;
  let fixture: ComponentFixture<GerenterelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenterelatoriosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenterelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
