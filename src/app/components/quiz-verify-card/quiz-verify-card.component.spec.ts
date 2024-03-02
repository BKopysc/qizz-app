import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizVerifyCardComponent } from './quiz-verify-card.component';

describe('QuizVerifyCardComponent', () => {
  let component: QuizVerifyCardComponent;
  let fixture: ComponentFixture<QuizVerifyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizVerifyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizVerifyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
