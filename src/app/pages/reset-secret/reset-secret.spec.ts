import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSecret } from './reset-secret';

describe('ResetSecret', () => {
  let component: ResetSecret;
  let fixture: ComponentFixture<ResetSecret>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSecret]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetSecret);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
