import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPendiente } from './verificar-pendiente';

describe('VerificarPendiente', () => {
  let component: VerificarPendiente;
  let fixture: ComponentFixture<VerificarPendiente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarPendiente],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarPendiente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
