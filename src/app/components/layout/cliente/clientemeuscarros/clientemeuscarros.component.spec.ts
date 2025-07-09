import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientemeuscarrosComponent } from './clientemeuscarros.component';

describe('ClientemeuscarrosComponent', () => {
  let component: ClientemeuscarrosComponent;
  let fixture: ComponentFixture<ClientemeuscarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientemeuscarrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientemeuscarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
