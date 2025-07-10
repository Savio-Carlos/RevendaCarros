import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaVendaCarroComponent } from './nova-venda-carro.component';

describe('NovaVendaCarroComponent', () => {
  let component: NovaVendaCarroComponent;
  let fixture: ComponentFixture<NovaVendaCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaVendaCarroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaVendaCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
