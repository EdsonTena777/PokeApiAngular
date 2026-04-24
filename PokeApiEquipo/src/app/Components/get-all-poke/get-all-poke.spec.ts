import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPoke } from './get-all-poke';

describe('GetAllPoke', () => {
  let component: GetAllPoke;
  let fixture: ComponentFixture<GetAllPoke>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllPoke],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllPoke);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
