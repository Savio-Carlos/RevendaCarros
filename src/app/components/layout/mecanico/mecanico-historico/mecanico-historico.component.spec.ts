import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoHistoricoComponent } from './mecanico-historico.component';

describe('MecanicoHistoricoComponent', () => {
  let component: MecanicoHistoricoComponent;
  let fixture: ComponentFixture<MecanicoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicoHistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
