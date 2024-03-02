import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IQuiz } from '../../interfaces/quiz.interface';
import { IQuizCheck } from '../../interfaces/quiz-check.interface';
import { IAllAnswers, IQuestionAllAnswers, IQuizAllAnswers } from '../../interfaces/quiz-all-answers.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quiz-card-answers',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatIconModule],
  templateUrl: './quiz-card-answers.component.html',
  styleUrl: './quiz-card-answers.component.scss'
})
export class QuizCardAnswersComponent implements OnInit {

  @Input() quizData!: IQuiz;
  @Input() userAnswers: IQuizCheck[] = []
  
  quizFinalData: IQuizAllAnswers = {
    questions: []
  }

  constructor() { }

  ngOnInit(): void {
    this.convertData();
    console.log(this.quizData);
    console.log(this.userAnswers);
  }

  private convertData(){
    this.quizData.questions.forEach((question) => {
      //find answers in userAnswers
      const userQuestion = this.userAnswers.find((q) => q.questionId === question.id); //it will be one
      if(userQuestion === undefined) return;

      const allAnswers: IAllAnswers[] = [];

      question.answers.forEach((answer) => {

        const foundUserAnswer = userQuestion.answers.find((userAnswer) => userAnswer.id === answer.id);
        
        allAnswers.push({
          name: answer.name,
          isCorrect: answer.isCorrect,
          isUserAnswer: foundUserAnswer ? true : false
        });
      });

      const questionAllAnswer: IQuestionAllAnswers = {
        name: question.name,
        answers: allAnswers
      };

      console.log(questionAllAnswer);

      this.quizFinalData.questions.push(questionAllAnswer);
    });
  }

  

}
