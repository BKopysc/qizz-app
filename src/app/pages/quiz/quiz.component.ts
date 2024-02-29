import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IQuiz } from '../../interfaces/quiz.interface';
import { decompressData } from '../../utils/compress-data';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule,MatProgressSpinnerModule, CommonModule,
     MatButtonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

  quizData?: IQuiz;
  compressedData: string = '';
  isUncompressError = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const compressedData = params['data'];
      try{
        const uncompressed = decompressData(compressedData);
        if(uncompressed === null){
          this.isUncompressError = true;
          return;
        }
        this.quizData = uncompressed;
      } catch(e){
        this.isUncompressError = true;
      }
    });
  }

}
