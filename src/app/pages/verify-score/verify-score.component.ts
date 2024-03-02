import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, shareReplay } from 'rxjs';
import { QuizVerifyCardComponent } from '../../components/quiz-verify-card/quiz-verify-card.component';
import { IQuizVerify } from '../../interfaces/quiz-verify.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { verifySignatures } from '../../utils/generate-signature';

@Component({
  selector: 'app-verify-score',
  standalone: true,
  imports: [MatInputModule, FormsModule, 
    CommonModule, MatCardModule, ReactiveFormsModule,
    RouterModule,
    MatIconModule, MatButtonModule, QuizVerifyCardComponent],
  templateUrl: './verify-score.component.html',
  styleUrl: './verify-score.component.scss'
})
export class VerifyScoreComponent implements OnInit{

  isVerified = false;
  isValid = false;

  score = 0;


  quizFormGroup: FormGroup = this.formBuilder.group({
    quizSignatureCtrl: ['', Validators.required],
    scoreSignatureCtrl: ['', Validators.required],
    idCtrl: ['', Validators.required],
    scoreCtrl: ['', Validators.required ]
  });

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const quizSignParam = params['quizSig'];
        const scoreSignParam = params['scoreSig'];
        const scoreParam = params['score'];
        const idParam = params['id'];

        if(quizSignParam && scoreSignParam && scoreParam && idParam){
          this.quizFormGroup.get('quizSignatureCtrl')?.setValue(quizSignParam);
          this.quizFormGroup.get('scoreSignatureCtrl')?.setValue(scoreSignParam);
          this.quizFormGroup.get('scoreCtrl')?.setValue(scoreParam);
          this.quizFormGroup.get('idCtrl')?.setValue(idParam);
        }

        this.onVerifyScore();
    });
  }


  
  onCloseCard(){
    this.isVerified = false;
  }

  onVerifyScore(){
    const isFormValid = this.quizFormGroup?.valid;

    if(!isFormValid){
      return;
    }

    const verifyData = {
      score: parseInt(this.quizFormGroup?.get('scoreCtrl')?.value),
      quizSignature: parseInt(this.quizFormGroup?.get('quizSignatureCtrl')?.value),
      scoreSignature: parseInt(this.quizFormGroup?.get('scoreSignatureCtrl')?.value),
      id: parseInt(this.quizFormGroup?.get('idCtrl')?.value)
    };

    this.score = verifyData.score;

    const verifyRes = verifySignatures(verifyData);
    this.isVerified = true;
    this.isValid = verifyRes;

  }

}
