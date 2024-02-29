import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CustomRoute } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { NavbarIconComponent } from '../navbar-icon/navbar-icon.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
    MatIconModule,
    NavbarIconComponent
  ]
})

export class NavbarComponent {

  public routes: {route: CustomRoute, name: string, icon: string}[]= [
    {route: 'home', name: 'Home', icon: 'home'},
    {route: 'load-quiz', name: 'Load Quiz', icon: 'question_answer'},
    {route: 'about', name: 'About', icon: 'info'},
    {route: 'template', name: 'Template', icon: 'format_list_bulleted'}
  ]
  constructor(private router: Router) {}

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    onRouteSelect(name: CustomRoute) {
      this.router.navigate([name]);
    }
}
