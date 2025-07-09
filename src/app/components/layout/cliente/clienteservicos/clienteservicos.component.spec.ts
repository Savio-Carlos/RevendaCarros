import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteservicosComponent } from './clienteservicos.component';

describe('ClienteservicosComponent', () => {
  let component: ClienteservicosComponent;
  let fixture: ComponentFixture<ClienteservicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteservicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteservicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
