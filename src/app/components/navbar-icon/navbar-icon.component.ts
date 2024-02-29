import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomRoute } from '../../app.routes';

@Component({
  selector: 'app-navbar-icon',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule],
  templateUrl: './navbar-icon.component.html',
  styleUrl: './navbar-icon.component.scss'
})
export class NavbarIconComponent {

  @Input() name: string = "";
  @Input() routeName: CustomRoute = 'home';
  @Input() matIcon: string = "";
  @Output() onSelectedRoute = new EventEmitter<CustomRoute>();

  onRouteSelect() {
    this.onSelectedRoute.emit(this.routeName);
  }

}
