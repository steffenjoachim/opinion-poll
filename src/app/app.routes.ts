import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreatingOpinionPollComponent } from './creating-opinion-poll/creating-opinion-poll.component'
import { DisplayOpinionPollsComponent } from './display-opinion-polls/display-opinion-polls.component';

export 

const routes: Routes = [
    {path: '', component: LandingPageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {path: 'create', component: CreatingOpinionPollComponent},
    {path: 'display', component: DisplayOpinionPollsComponent},
];
