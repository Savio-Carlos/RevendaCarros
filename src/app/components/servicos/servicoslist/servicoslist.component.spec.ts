import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoslistComponent } from './servicoslist.component';

describe('ServicoslistComponent', () => {
  let component: ServicoslistComponent;
  let fixture: ComponentFixture<ServicoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicoslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
