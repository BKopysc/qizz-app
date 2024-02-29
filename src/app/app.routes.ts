import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GeneratorComponent } from './pages/generator/generator.component';


export type CustomRoute = 'home' | 'generator' | 'about';

export const routes: Routes = 
[{ path: '', redirectTo: 'home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'generator', component: GeneratorComponent},
];
