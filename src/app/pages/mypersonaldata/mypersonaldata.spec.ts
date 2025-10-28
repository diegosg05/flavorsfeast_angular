import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mypersonaldata } from './mypersonaldata';

describe('Mypersonaldata', () => {
  let component: Mypersonaldata;
  let fixture: ComponentFixture<Mypersonaldata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mypersonaldata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mypersonaldata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
