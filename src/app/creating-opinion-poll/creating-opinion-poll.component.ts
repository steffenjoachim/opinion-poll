import { Component } from '@angular/core';
import { PollCardComponent } from '../poll-card/poll-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SinglePoll } from '../interfaces/single-poll.interface';

@Component({
  selector: 'app-creating-opinion-poll',
  standalone: true,
  imports: [
    PollCardComponent,
    NavbarComponent,
  ],
  templateUrl: './creating-opinion-poll.component.html',
  styleUrl: './creating-opinion-poll.component.scss'
})
export class CreatingOpinionPollComponent {

}
