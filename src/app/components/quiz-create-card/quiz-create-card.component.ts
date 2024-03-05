import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAnswer, IOptions, IQuestion, IQuiz } from '../../interfaces/quiz.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-quiz-create-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatExpansionModule, MatCheckboxModule, FormsModule, MatInputModule, MatDividerModule],
  templateUrl: './quiz-create-card.component.html',
  styleUrl: './quiz-create-card.component.scss'
})
export class QuizCreateCardComponent implements OnInit, OnChanges, OnDestroy{

  @Input() title: string = "title";
  @Input() description: string = "description";
  @Input() parentSubject?: Subject<any>;
  @Input() quizContent: IQuiz = {description: '', name: '', questions: []};
  @Output() getQuizContent = new EventEmitter<IQuiz>();

  isMultipleChoice: boolean = false;

  answerMap = new Map<number, boolean>();

  readyQuizContent: IQuiz | undefined;

  newQuestion: string = '';
  questionIdCtr: number = 0;

  newAnswer: string = '';

  quizOptions: IOptions = {showAnswers: false, shuffleQuestions: false};

  uid = new ShortUniqueId({ length: 10 });

  constructor() {

  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnChanges(changes: SimpleChanges): void {
    // if(!changes['quizContent'].firstChange){
    //   this.fillAnswerMap();
    // }
  }

  ngOnDestroy(): void {
    this.parentSubject?.unsubscribe();
  }

  ngOnInit(): void {
    this.isMultipleChoice = this.checkMultipleChoiceCompatibility();
    this.parentSubject?.subscribe(e => {
      this.emitQuizContent();
    });
  }

  private emitQuizContent(){
    this.quizContent.name = this.title;
    this.quizContent.description = this.description;
    this.quizContent.options = this.quizOptions;
    this.getQuizContent.emit(this.quizContent);
  }

  addQuestion(){
    let newQuestion: IQuestion = {id: this.uid.rnd(), name: this.newQuestion, answers: []};
    this.quizContent.questions.push(newQuestion);
    this.newQuestion = '';
  }

  deleteQuestion(question: IQuestion){
    let index = this.quizContent.questions.indexOf(question);
    this.quizContent.questions.splice(index, 1);
  }

  addAnswer(question: IQuestion) {
    question.answers.push({id: this.uid.rnd(), name: this.newAnswer, isCorrect: false});
    this.newAnswer = '';
  }

  deleteAnswer(question: IQuestion, answer: IAnswer){
    let index = question.answers.indexOf(answer);
    question.answers.splice(index, 1);
  }

  changeAnswerState(question: IQuestion, answerId: string){
    question.answers.forEach(a => {
      if(a.id === answerId){
        a.isCorrect = !a.isCorrect;
      }
    });
  }


  private checkMultipleChoiceCompatibility() {
    let isMultiple = false;
    if(this.quizContent){
      this.quizContent.questions.forEach(q => {
        let isCorrectCtr = 0;
        q.answers.forEach(a => {
          if(a.isCorrect) isCorrectCtr+=1;
        });
        if(isCorrectCtr > 1) isMultiple = true;
        return isMultiple;
      });
    }

    return isMultiple;
  }



}
