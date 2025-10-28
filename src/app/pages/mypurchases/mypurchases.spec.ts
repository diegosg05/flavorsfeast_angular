import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mypurchases } from './mypurchases';

describe('Mypurchases', () => {
  let component: Mypurchases;
  let fixture: ComponentFixture<Mypurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mypurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mypurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
