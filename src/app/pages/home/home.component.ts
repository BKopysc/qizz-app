import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { generatePrompt } from '../../utils/generate-prompt';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { openSnackBar } from '../../utils/snacbkar-wrapper';
import { LoadFromTemplate } from '../../utils/template-loader';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { QuizCreateCardComponent } from '../../components/quiz-create-card/quiz-create-card.component';
import { IQuiz } from '../../interfaces/quiz.interface';
import { Subject } from 'rxjs';
import { compressData } from '../../utils/compress-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ClipboardModule,
    MatIconModule,
    MatDividerModule,
    QuizCreateCardComponent,
    MatProgressBarModule,
    MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



  quizInfoFormGroup = this._formBuilder.group({
    titleCtrl: ['', [Validators.required, Validators.maxLength(50)]],
    descriptionCtrl: ['Quiz', [Validators.required, Validators.maxLength(50)]],
  });

  aiGeneratedFormGroup = this._formBuilder.group({
    mainSubjectCtrl: [''],
    languageCtrl: [''],
    numOfQuestionsCtrl: [10],
    difficultyCtrl: ['easy'],
    enableMultipleChoiceCtrl: [false],
  });

  loadTemplateFormGroup = this._formBuilder.group({
    templateCtrl: [''],
  });

  difficultyLevels: { value: string, viewValue: string }[] = [
    { value: 'easy', viewValue: 'Easy' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'hard', viewValue: 'Hard' }
  ];

  textAreaResult: string = "";
  isGenerated = false;
  isUseEditor = false;
  isUseAi = false;

  isLoadedFromTemplate = false;
  isLoadedFromTemplateError = false;
  isEditorStepOpened = false;

  loadedQuiz: IQuiz = {name: '', description: 'quiz', questions: []};

  quizFinalContent?: IQuiz;
  compressedQuizContent: string = '';

  eventsSubject: Subject<any> = new Subject();

  constructor(private _formBuilder: FormBuilder, private _router: Router,
    private _snackBar: MatSnackBar, private _clipboard: Clipboard) { }

  onGenerateQuiz() {
    this.isGenerated = true;
    const formValues = this.aiGeneratedFormGroup.value;
    const generated = generatePrompt(formValues.mainSubjectCtrl!, formValues.languageCtrl!, formValues.difficultyCtrl!, formValues.numOfQuestionsCtrl!, formValues.enableMultipleChoiceCtrl!);
    this.textAreaResult = generated;
  }


  onCopyGenerated() {
    openSnackBar("Copied to clipboard", this._snackBar);
    this._clipboard.copy(this.textAreaResult);
  }

  useEditorButtonClick() {
    this.isUseEditor = true;
    this.isUseAi = false;
  }

  useAiButtonClick() {
    this.isUseAi = true;
    this.isUseEditor = false;
  }


  loadFromTemplate(matStepperCtx: MatStepper) {
    if(this.loadTemplateFormGroup.value.templateCtrl !== "") {
      const loadedRes = LoadFromTemplate(this.loadTemplateFormGroup.value.templateCtrl!);
      if(loadedRes === null) {
        this.isLoadedFromTemplateError = true;
        return;
      }
      this.loadedQuiz.questions = [...loadedRes.questions];
      matStepperCtx.next();
    } else {
      matStepperCtx.next();
    }
  }

  onSaveData(stepper: MatStepper) {
    this.compressedQuizContent = '';
    this.eventsSubject.next(1);
    stepper.next();
  }

  onRecieveQuizContent(quizContent: IQuiz){
    this.quizFinalContent = quizContent;
    const compressed = compressData(quizContent)
    if(compressed === null) {
      console.error("Error compressing data");
      return;
    }
    this.compressedQuizContent = compressed;
  }

  combineLink(){
    return window.location.origin + "/quiz/" + this.compressedQuizContent;
  }

  onCopyLink() {
    openSnackBar("Link copied to clipboard", this._snackBar);
    this._clipboard.copy(this.combineLink());
  }

  onCopyData(){
    openSnackBar("Data copied to clipboard", this._snackBar);
    this._clipboard.copy(this.compressedQuizContent);
  }

  onClearTemplateTextarea(){
    this.loadTemplateFormGroup.get("templateCtrl")?.setValue('');
    this.isLoadedFromTemplateError = false;
  }

  // onViewQuiz(){
  //   const route = location.origin + '/quiz' + this.compressedQuizContent;
  //   window.open(route, '_blank');
  // }

  onReset(){
    //Refresh page
    window.location.reload();
  }

}
