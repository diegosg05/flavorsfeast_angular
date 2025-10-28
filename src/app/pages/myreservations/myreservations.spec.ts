import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myreservations } from './myreservations';

describe('Myreservations', () => {
  let component: Myreservations;
  let fixture: ComponentFixture<Myreservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myreservations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myreservations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
