import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, NtkmeButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  urlForQuiz = "/quiz";

  constructor(private router: Router) { 
    this.urlForQuiz
  }

  compressedData = "N4IgdghgtgpiBcIDCEAOBLALhANgAgGMt0YBnEAGhABMyCAndVTdAezARAEUBXdAL0ogAjjzIt25eAG1QkWJwDqACwiY86UnkzKYhNFlx5WAMzwAFVjghhqAfiHpqnCEgCyARgAcATQDyYAAqAExCNqQA7jD0UrLg0HCIihAxEBGOzoj8ADKoAGoAzIHUACJQ6I6kSKz09DAEmAiY9GIAvhRyCZwA0vQQANas6VROLgAMdZhjAOZpjSNVNXUNCCa4pDDtnQpJ9KwE1sMgo4jTAB4AQuY8gTDBeQCSldW19Y3wazgbrQC6W-E7EB4FRqDRaHR6AgGbD4Ux4ADi0SgNgAng4RpkQIEAOxeC5uB48HwAMUUYTAkWisW2iRAF2iOHQHAxnGmADYCuguFwLgApMaBZ5LN5NFqbDoA2luHhgdAEZQZTi8gByABYABLCQJ+G4+IWvFYfdbimmcdXQABGPHo00ViD8ijyEBgOH4ADdeQBBfXLd6fb5-H5UVjMNgUhCgUjKIaeilRGKisRUKM8EwmHAwXjiMNSZptVpAA+dg6ITq6eCnFUakis9PQwBJicmPTCIAC+FNLhnADS9BAA1qxpIPaOLu5eAB52pJnZufmIhrikcGUVspH0rAQWTS2JbSkAnt29OXmcQzgjpQC6Y2ETIHiKyqrqmtoEutj4RngA4kFQlku26QkgSe0KAF6+YACQRC4wiIAAQkEcOgOB9WskPOgAAyrLLrAYgQrFA4yMEAWUEYHQBAU8Xh7XQAEZUX0NoNhqNyocwQAJaAAI0E9AA5mSFgj0B4aejNgy9iV9kA"

}
