import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  urlForQuiz = "/quiz";

  constructor(private router: Router) { 
    this.urlForQuiz
  }

  compressedData = "N4IgdghgtgpiBcIDCEAOBLALhANgAgGMt0YBnEAGhABMyCAndVTdAezARADofKQBHAK5kW7cvADaoSLE4B1ABYRMedKTyYFMQmiy48rAGZ4ACqxwQw1APx901TjkwB2TADcATArd9LpAO4w9OJS4NBwiHIQwRD+dg6ITq6eCnFUakis9PQwBJicmPTCIAC+FNLhnADS9BAA1qxpIPaOLu5eAB52pJnZufmIhrikcGUVspH0rAQWTS2JbSkAnt29OXmcQzgjpQC6Y2ETIHiKyqrqmtoEutj4RngA4kFQlku26QkgSe0KAF6+YACQRC4wiIAAQkEcOgOB9WskPOgAAyrLLrAYgQrFA4yMEAWUEYHQBAU8Xh7XQAEZUX0NoNhqNyocwQAJaAAI0E9AA5mSFgj0B4aejNgy9iV9kA"

}
