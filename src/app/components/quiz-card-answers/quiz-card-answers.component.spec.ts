import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCardAnswersComponent } from './quiz-card-answers.component';

describe('QuizCardAnswersComponent', () => {
  let component: QuizCardAnswersComponent;
  let fixture: ComponentFixture<QuizCardAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCardAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizCardAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
