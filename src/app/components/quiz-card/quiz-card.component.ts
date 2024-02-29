
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAnswer, IQuestion, IQuiz } from '../../interfaces/quiz.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { IQuizCheck } from '../../interfaces/quiz-check.interface';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatExpansionModule, 
    FormsModule, ReactiveFormsModule,
    MatCheckboxModule, MatDividerModule],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent implements OnInit{

  @Input() quizData?: IQuiz;
  @Output() onQuizEnded = new EventEmitter<IQuizCheck[]>();
  isLoading = false;

  //questionsAnswersMap = new Map<string, [string]>();
  quizFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.quizFormGroup = this.formBuilder.group({
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  ngOnInit(): void {


    if(this.quizData){
      this.quizData.questions.forEach((question: IQuestion) => {
        this.quizFormGroup.addControl('q-'+question.id, this.formBuilder.group({}));
        const questionGroup = this.quizFormGroup.get('q-'+question.id) as FormGroup;
        question.answers.forEach((answer: IAnswer) => {
          questionGroup.addControl('a-'+answer.id, this.formBuilder.control(false));
        });
      });
      this.isLoading = false;
    }
    console.log(this.quizFormGroup)
  }


  public onSendQuiz(){
    let results = this.getResults();
    this.onQuizEnded.emit(results);
  }

  private getResults(): IQuizCheck[]{
    let results: IQuizCheck[] = [];
    if(this.quizData){
      this.quizData.questions.forEach((question: IQuestion) => {
        const quizCheck: IQuizCheck = {questionId: question.id, answers: []};
        const questionGroup = this.quizFormGroup.get('q-'+question.id) as FormGroup;
        question.answers.forEach((answer: IAnswer) => {
          if(questionGroup.get('a-'+answer.id)?.value){
            quizCheck.answers.push(answer);
          }
        });
        results.push(quizCheck);
      });
    }
    return results;
  }




}
