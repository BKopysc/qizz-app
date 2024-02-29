import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { generatePrompt } from '../../utils/generate-prompt';
import { CommonModule } from '@angular/common';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { openSnackBar } from '../../utils/snacbkar-wrapper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [    MatButtonModule,
    MatStepperModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ClipboardModule,
    MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  quizInfoFormGroup = this._formBuilder.group({
    titleCtrl: ['', [Validators.required, Validators.maxLength(50)]],
    descriptionCtrl: ['', [Validators.required, Validators.maxLength(50)]],
  });

  aiGeneratedFormGroup = this._formBuilder.group({
    mainSubjectCtrl: [''],
    languageCtrl: [''],
    numOfQuestionsCtrl: [10],
    difficultyCtrl: ['easy'],
    enableMultipleChoiceCtrl: [false],
  });

  difficultyLevels: {value: string, viewValue: string}[] = [
    {value: 'easy', viewValue: 'Easy'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'hard', viewValue: 'Hard'}
  ];

  textAreaResult: string = "";
  isGenerated = false;


  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _clipboard: Clipboard) {}

  onGenerateQuiz(){
    this.isGenerated = true;
    const formValues = this.aiGeneratedFormGroup.value;
    const generated = generatePrompt(formValues.mainSubjectCtrl!, formValues.languageCtrl!,formValues.difficultyCtrl!,  formValues.numOfQuestionsCtrl!, formValues.enableMultipleChoiceCtrl!);
    this.textAreaResult = generated;
  }
  
  onCopyGenerated(){
    openSnackBar("Copied to clipboard", this._snackBar);
    this._clipboard.copy(this.textAreaResult);
  }

}
