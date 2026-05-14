import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUser } from './get-all-user';

describe('GetAllUser', () => {
  let component: GetAllUser;
  let fixture: ComponentFixture<GetAllUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllUser],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
