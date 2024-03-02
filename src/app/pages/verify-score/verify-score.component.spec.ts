import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyScoreComponent } from './verify-score.component';

describe('VerifyScoreComponent', () => {
  let component: VerifyScoreComponent;
  let fixture: ComponentFixture<VerifyScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
