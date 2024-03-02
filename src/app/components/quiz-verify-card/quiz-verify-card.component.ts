import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quiz-verify-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatCommonModule],
  templateUrl: './quiz-verify-card.component.html',
  styleUrl: './quiz-verify-card.component.scss'
})
export class QuizVerifyCardComponent {

  @Input() score: number = 0;
  @Input() verifyResult: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  onCloseCard(){
    this.onClose.emit();
  }

}
