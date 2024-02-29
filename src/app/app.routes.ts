import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LoadQuizComponent } from './pages/load-quiz/load-quiz.component';
import { XmlTemplateComponent } from './pages/xml-template/xml-template.component';


export type CustomRoute = 'home' | 'quiz' | 'about' | 'quiz' | 'load-quiz' | 'template';

export const routes: Routes = 
[{ path: '', redirectTo: 'home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'quiz/:data', component: QuizComponent},
{path: 'load-quiz', component: LoadQuizComponent},
{path: 'template', component: XmlTemplateComponent}
];
