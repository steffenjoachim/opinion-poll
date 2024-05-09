import { Component, OnInit, NgModule, Injectable, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseServiceService } from '../services/firebase-service.service'
import { Timestamp } from 'firebase/firestore';
import { Option } from '../interfaces/option.interface';
import { SinglePoll } from '../interfaces/single-poll.interface';

@Component({                                                         
  selector: 'app-poll-card',       
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
    ],
  templateUrl: './poll-card.component.html',
  styleUrl: './poll-card.component.scss'
})
export class PollCardComponent implements OnInit {

  optionList: Option[] = [
    { id: 1, text: "", placeholder: "Bsp.: mit öffentlichen Verkehrsmitteln", characterCountOption: 0 },
    { id: 2, text: "", placeholder: "Bsp.: mit dem eigenen Auto", characterCountOption: 0 },
  ];

  question_max_allowed_characters: number = 140;
  option_max_allowed_characters: number = 30;
  characterCountQuestion: number = 0;
  characterCountOption: number = 0;
  questionText: string = '';
  optionText: string = '';
  options: string[] = []; 
  singlePoll: SinglePoll = {
    id: '',
    question: '',
    options: [],
    voteCount: 0,
    createdAt: Timestamp.now(),
    duration : '',
  };

  selectedDuration: string = '1 Woche'

  constructor(public noteService: FirebaseServiceService) {}

  ngOnInit() {
    this.updateCharacterCountQuestion();
  }

  updateCharacterCountQuestion() {
    this.characterCountQuestion = this.questionText.length;
  }

  updateCharacterCountOption(i: number) {
    const option = this.optionList[i-1];
    option.characterCountOption = option.text.length; 
  }

  addOption() {
    const newOptionId = this.optionList.length + 1; 
    const newOption: Option = { 
      id: newOptionId,
      text: "",
      placeholder: "Neue Option",
      characterCountOption: 0
    };
    this.optionList.push(newOption); 
  }

  isFormValid(): boolean {
    
    const questionFilled = this.questionText.trim() !== '';
    const optionsFilled = this.optionList.every(option => option.text.trim() !== '');

    return questionFilled && optionsFilled;
}

onDurationChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.selectedDuration = value; // Update der selectedDuration
  console.log(value); // Hier haben Sie den ausgewählten Wert
  // Führen Sie hier die weiteren Aktionen aus, z.B. speichern Sie den Wert in einer Variable oder übergeben Sie ihn an eine Funktion
}

saveOpinionPoll() {
  // Extrahieren Sie die Optionen aus der optionList
  this.options = this.optionList.map(option => option.text);

  // Erstellen einer neuen Instanz von SinglePoll
  const singlePoll: SinglePoll = {
      id: '', 
      question: this.questionText,
      options: this.options.map(optionText => ({ text: optionText, votesReceived: 0 })), // Hier fügen Sie die Texte der Optionen hinzu und setzen die Anfangsprozentsätze auf 0
      voteCount: 0, // Anfangszahl der Stimmen
      createdAt: Timestamp.now(), // Aktuelles Datum als Timestamp
      duration: this.selectedDuration // Dauer der Umfrage aus dem Dropdown-Menü
  };

  // Hier können Sie die singlePoll-Instanz an Firebase senden oder anderweitig verwenden
  console.log(singlePoll);
  this.noteService.addPoll(singlePoll); // Hier rufen Sie die Methode addOpinionPoll auf

  // Zurücksetzen der Eingabefelder
  this.resetInputFields();
}

resetInputFields(){
  this.questionText = '';
  this.optionList = [
    { id: 1, text: "", placeholder: "Bsp.: mit öffentlichen Verkehrsmitteln", characterCountOption: 0 },
    { id: 2, text: "", placeholder: "Bsp.: mit dem eigenen Auto", characterCountOption: 0 },
  ];
  this.selectedDuration = '1 Woche';
}

addOpinionPoll(singlePoll: SinglePoll) {
  this.noteService.addPoll(singlePoll);
}


}

