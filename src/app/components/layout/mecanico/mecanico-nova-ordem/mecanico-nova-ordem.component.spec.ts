import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoNovaOrdemComponent } from './mecanico-nova-ordem.component';

describe('MecanicoNovaOrdemComponent', () => {
  let component: MecanicoNovaOrdemComponent;
  let fixture: ComponentFixture<MecanicoNovaOrdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicoNovaOrdemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicoNovaOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
