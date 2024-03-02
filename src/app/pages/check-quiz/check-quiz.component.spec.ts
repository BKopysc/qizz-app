import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQuizComponent } from './check-quiz.component';

describe('CheckQuizComponent', () => {
  let component: CheckQuizComponent;
  let fixture: ComponentFixture<CheckQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
