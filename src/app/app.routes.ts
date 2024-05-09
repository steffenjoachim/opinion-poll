import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreatingOpinionPollComponent } from './creating-opinion-poll/creating-opinion-poll.component'
import { DisplayOpinionPollsComponent } from './display-opinion-polls/display-opinion-polls.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'create', component: CreatingOpinionPollComponent},
    {path: 'display', component: DisplayOpinionPollsComponent},
];
