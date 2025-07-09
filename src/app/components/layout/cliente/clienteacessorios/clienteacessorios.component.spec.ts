import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAcessoriosComponent } from './clienteacessorios.component';

describe('ClienteacessoriosComponent', () => {
  let component: ClienteAcessoriosComponent;
  let fixture: ComponentFixture<ClienteAcessoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteAcessoriosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAcessoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
