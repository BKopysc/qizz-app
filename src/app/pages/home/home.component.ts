import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
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
  });


  constructor(private _formBuilder: FormBuilder) {}

}
