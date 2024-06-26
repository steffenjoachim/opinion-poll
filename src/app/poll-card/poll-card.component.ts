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

  /**
   * This function is used to count und update the characters of the question when entered
   */
  updateCharacterCountQuestion() {
    this.characterCountQuestion = this.questionText.length;
  }

  /**
   * This function is used to count und update the characters of an option when entered
   */
  updateCharacterCountOption(i: number) {
    const option = this.optionList[i-1];
    option.characterCountOption = option.text.length; 
  }

  /**
   * This function is used to add an option. Originally there are 2 options foreseen as minimum, but if needed additional options can be added.
   */
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

  /**
   * This function is used to check if all parts of the form - the question and all options - have been filled in.
   */
  isFormValid(): boolean {
    
    const questionFilled = this.questionText.trim() !== '';
    const optionsFilled = this.optionList.every(option => option.text.trim() !== '');

    return questionFilled && optionsFilled;
}

/**
   * This function is used to check if the standard opinion poll duration of 1 week is changed to another selectable value and to update the selectedDuration variable accordingly.
   */
onDurationChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.selectedDuration = value; // Update der selectedDuration
}

/**
   * This function is used to save a new opinion poll.
   */
saveOpinionPoll() {
  this.options = this.optionList.map(option => option.text); // Extracts the options from the optionList.
  // Create a new instance of SinglePoll:
  const singlePoll: SinglePoll = {
      id: '', 
      question: this.questionText,
      options: this.options.map(optionText => ({ text: optionText, votesReceived: 0 })), 
      voteCount: 0, 
      createdAt: Timestamp.now(), 
      duration: this.selectedDuration 
  };
  this.noteService.addPoll(singlePoll); // Here the method addOpinionPoll is called to save it to firebase

  this.resetInputFields(); 
}

/**
   * This function is used to clear and restet the input fields afer an opinion poll has been saved.
   */
resetInputFields(){
  this.questionText = '';
  this.optionList = [
    { id: 1, text: "", placeholder: "Bsp.: mit öffentlichen Verkehrsmitteln", characterCountOption: 0 },
    { id: 2, text: "", placeholder: "Bsp.: mit dem eigenen Auto", characterCountOption: 0 },
  ];
  this.selectedDuration = '1 Woche';
}

/**
   * This function is used to add the opinion poll to firebase using the addPoll function definded in the firbase service.
   */
addOpinionPoll(singlePoll: SinglePoll) {
  this.noteService.addPoll(singlePoll);
}


}

