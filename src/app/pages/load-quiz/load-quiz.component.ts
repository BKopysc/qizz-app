import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatButtonModule, RouterModule],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.scss'
})
export class LoadQuizComponent {

  constructor(private _router: Router) { }

  onLoadData() {
    this._router.navigate(['quiz', this.quizCompressedData ]);
  }

  quizCompressedData: string = '';

}
