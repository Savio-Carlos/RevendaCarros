import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoServicosAbertosComponent } from './mecanico-servicos-abertos.component';

describe('MecanicoServicosAbertosComponent', () => {
  let component: MecanicoServicosAbertosComponent;
  let fixture: ComponentFixture<MecanicoServicosAbertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicoServicosAbertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicoServicosAbertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
