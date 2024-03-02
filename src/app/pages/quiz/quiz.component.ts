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
import { IQuizImage } from '../../interfaces/quiz-image.interface';
import { generateSignatureForQuiz, generateSignatureForQuizAndScore } from '../../utils/generate-signature';
import { CustomRouteEnum } from '../../app.routes';
import ShortUniqueId from 'short-unique-id';
import { QuizCardAnswersComponent } from '../../components/quiz-card-answers/quiz-card-answers.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, ClipboardModule,
    MatButtonModule, QuizCardComponent, MatTooltipModule, QuizCardAnswersComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quizData?: IQuiz;
  quizUserAnswers?: IQuizCheck[];
  compressedData: string = '';
  isUncompressError = false;
  isResult = false;
  calculatedScore = { score: 0, maxScore: 0, percentage: '' };
  quizSignature: number = 0;
  quizScoreSignature: number = 0;
  id: number = 0;
  imageUrl: string = '';

  uid = new ShortUniqueId({ length: 12, dictionary: 'number' });

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
        this.shuffleQuestionsAndAnswers();
      } catch (e) {
        this.isUncompressError = true;
      }
    });
  }

  private shuffleQuestionsAndAnswers(): void {

    if (this.quizData?.options?.shuffleQuestions === true) {

      this.quizData.questions.forEach(q => {
        q.answers = [...this.shuffleArray(q.answers)];
      });

      this.quizData.questions = [...this.shuffleArray(this.quizData.questions)];
    }
  }

  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getQuizResults(answers: IQuizCheck[]) {
    this.quizUserAnswers = answers;
    this.calculatedScore = this.countScore(answers);
    this.calcSignatures();
    this.isResult = true;
  }

  private calcSignatures() {
    this.id = parseInt(this.uid.rnd())
    const generatedSignatures = generateSignatureForQuizAndScore(this.quizData!, this.calculatedScore.score, this.id);
    this.quizScoreSignature = generatedSignatures.scoreSignature;
    this.quizSignature = generatedSignatures.quizSignature;
  }

  onResetQuiz() {
    this.isResult = false;
    this.imageUrl = '';
    this.calculatedScore = { score: 0, maxScore: 0, percentage: '' };
  }

  async onShareScore() {
    //const fullPath = window.location.href;
    //const shared = shareScoreTemplate(this.calculatedScore.score, this.calculatedScore.maxScore, this.quizData!.name, fullPath);
    //this.clipboard.copy(shared);
    const verifyUrl = window.origin + "/" + CustomRouteEnum.verify;
    const imageData: IQuizImage = {
      name: this.quizData!.name,
      score: this.calculatedScore.score,
      maxScore: this.calculatedScore.maxScore,
      percentage: this.calculatedScore.percentage,
      quizSignature: this.quizSignature,
      scoreSignature: this.quizScoreSignature,
      verifyUrl: verifyUrl,
      id: this.id
    }
    const imageUrl = await generateScoreToImage(imageData);
    this.imageUrl = imageUrl;
    //this.clipboard.copy(imageUrl);
    openSnackBar('Certificate generated', this._snackBar);
  }

  onOpenVerify() {
    const queryParams =
      "?quizSig=" + this.quizSignature
      + "&scoreSig=" + this.quizScoreSignature
      + "&score=" + this.calculatedScore.score
      + "&id=" + this.id;
    const url = window.origin + "/" + CustomRouteEnum.verify + queryParams;
    this.clipboard.copy(url);
    openSnackBar('Link copied to clipboard', this._snackBar);
  }

  private countScore(quizCheck: IQuizCheck[]): { score: number, maxScore: number, percentage: string } {
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
      if (questionScore == scoresPerQuestion.get(qc.questionId) && qc.answers.length == questionScore) {
        score++;
      }
    });

    let percentage = 0;
    if (maxScore > 0) {
      percentage = (score / maxScore) * 100;
    } else {
      percentage = 100;
    }


    return {
      score,
      maxScore,
      percentage: percentage.toFixed(2)
    };
  }

}
