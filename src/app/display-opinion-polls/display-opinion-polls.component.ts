import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { SinglePoll } from '../interfaces/single-poll.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-display-opinion-polls',
  standalone: true,
  imports: [ 
    NavbarComponent,
  ],
  templateUrl: './display-opinion-polls.component.html',
  styleUrl: './display-opinion-polls.component.scss'
})
export class DisplayOpinionPollsComponent {

  @Input() opinionPolls: SinglePoll[] = [];

  opinionPollList: SinglePoll[] = [];
  firebaseService: any;

  constructor(public pollService: FirebaseServiceService) {
    this.firebaseService = pollService;
  }

  ngOnInit() {
    this.getPollList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opinionPolls'] && changes['opinionPolls'].currentValue) {
      // Neue Liste der Umfragen
      const newOpinionPolls = changes['opinionPolls'].currentValue;
      
      // Löschen des alten Inhalts
      this.opinionPollList = [];
      console.log(this.opinionPollList)
      
      // Hinzufügen des neuen Inhalts
      this.opinionPollList.push(...newOpinionPolls);
      console.log(this.opinionPollList)
    }
  }
  

  getPollList() {

    this.opinionPollList = this.pollService.opinionPolls;

    console.log(this.opinionPollList)
  }

  private calculateRemainingDays(createdAt: Timestamp, duration: string): number {
    const createDate = new Date(createdAt.seconds * 1000);
    const [period, unit] = duration.split(' ');
    let days;
    switch (unit) {
        case 'Tag':
        case 'Tage':
            days = parseInt(period);
            break;
        case 'Woche':
        case 'Wochen':
            days = parseInt(period) * 7;
            break;
        default:
            days = 0;
    }
    const endDate = new Date(createDate.getTime() + days * 24 * 60 * 60 * 1000);
    const remainingTime = endDate.getTime() - Date.now();
    return Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Aufrunden, um Teiltage zu vermeiden
}

// Methode zur Überprüfung, ob die Umfrage abgelaufen ist
private isExpired(createdAt: Timestamp, duration: string): boolean {
    const remainingDays = this.calculateRemainingDays(createdAt, duration);
    return remainingDays <= 0;
}

// Methode zur Formatierung der verbleibenden Zeit
private formatRemainingTime(remainingDays: number): string {
    if (remainingDays <= 0) {
        return 'Umfrage geschlossen';
    }
    return `${remainingDays} Tage`;
}

// Öffentliche Methode zum Abrufen der verbleibenden Zeit
getRemainingTime(createdAt: Timestamp, duration: string): string {
    const remainingDays = this.calculateRemainingDays(createdAt, duration);
    return this.formatRemainingTime(remainingDays);
}

incrementVoteReceivedAndVoteCount(option: { text: string; votesReceived: number }, poll: SinglePoll) {
  this.firebaseService.incrementVoteReceivedAndVoteCount(option, poll);
}

roundToWholeNumber(value: number): number {
  return Math.round(value);
}


}
