import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPoke } from './login-poke';

describe('LoginPoke', () => {
  let component: LoginPoke;
  let fixture: ComponentFixture<LoginPoke>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPoke],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPoke);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
