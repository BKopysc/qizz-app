import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAnswer, IQuiz } from '../../interfaces/quiz.interface';
import { decompressData } from '../../utils/compress-data';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { QuizCardComponent } from '../../components/quiz-card/quiz-card.component';
import { IQuizCheck } from '../../interfaces/quiz-check.interface';
import { shareScoreTemplate } from '../../utils/share-score-template';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { openSnackBar } from '../../utils/snacbkar-wrapper';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import hash from 'hash-it';
import { MatTooltipModule } from '@angular/material/tooltip';
import { generateScoreToImage } from '../../utils/generate-score-image';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, ClipboardModule,
    MatButtonModule, QuizCardComponent, MatTooltipModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quizData?: IQuiz;
  compressedData: string = '';
  isUncompressError = false;
  isResult = false;
  calculatedScore = { score: 0, maxScore: 0, percentage: 0 };
  quizSignature: number = 0;
  imageUrl: string = '';

  constructor(private route: ActivatedRoute, 
    private clipboard: Clipboard, private router: Router, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const compressedData = params['data'];
      try {
        const uncompressed = decompressData(compressedData);
        if (uncompressed === null) {
          this.isUncompressError = true;
          return;
        }
        this.quizData = uncompressed;
        console.log(this.quizData)
      } catch (e) {
        this.isUncompressError = true;
      }
    });
  }

  getQuizResults(answers: IQuizCheck[]) {
    console.log(answers);
    this.calcQuizSignature();
    this.calculatedScore = this.countScore(answers);
    this.isResult = true;
  }

  private calcQuizSignature(){
    this.quizSignature = hash(this.quizData);
  }

  onResetQuiz(){
    this.isResult = false;
    this.imageUrl = '';
    this.calculatedScore = { score: 0, maxScore: 0, percentage: 0 };
  }

  async onShareScore(){
    //const fullPath = window.location.href;
    //const shared = shareScoreTemplate(this.calculatedScore.score, this.calculatedScore.maxScore, this.quizData!.name, fullPath);
    //this.clipboard.copy(shared);
    const imageUrl = await generateScoreToImage(this.quizData!.name, this.calculatedScore.score, this.calculatedScore.maxScore, this.calculatedScore.percentage, this.quizSignature);
    this.imageUrl = imageUrl;
    //this.clipboard.copy(imageUrl);
    openSnackBar('Image generated', this._snackBar);
  }

  private countScore(quizCheck: IQuizCheck[]): { score: number, maxScore: number, percentage: number } {
    let score = 0;
    let maxScore = 0;
    let scoresPerQuestion = new Map<string, number>();
    this.quizData?.questions.forEach(q => {
      let questionScore = 0;
      q.answers.forEach(a => {
        if (a.isCorrect.toString() == "true") {
          maxScore++;
          questionScore++;
        }
      });
      scoresPerQuestion.set(q.id, questionScore);
    });

    quizCheck.forEach(qc => {
      let questionScore = 0;
      qc.answers.forEach(a => {
        if (a.isCorrect.toString() == "true") {
          questionScore++;
        }
      });
      if(questionScore == scoresPerQuestion.get(qc.questionId) && qc.answers.length == questionScore){
        score++;
      }
    });

    return {
      score,
      maxScore,
      percentage: (score / maxScore) * 100
    };
  }

}
