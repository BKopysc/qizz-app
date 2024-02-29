import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreateCardComponent } from './quiz-create-card.component';

describe('QuizCreateCardComponent', () => {
  let component: QuizCreateCardComponent;
  let fixture: ComponentFixture<QuizCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
