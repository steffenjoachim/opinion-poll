import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, Timestamp } from '@angular/fire/firestore';
import { SinglePoll } from '../interfaces/single-poll.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  firestore: Firestore = inject(Firestore);

  opinionPolls: SinglePoll[] = [];

  unsubPolls;

  constructor() { 
    this.unsubPolls = this.subPollList();
  }

  async addPoll(item: SinglePoll) {
    const collectionRef = this.getPollRef();
    await addDoc(collectionRef, item).then(
      (docRef) => {
        console.log("Document written with ID: ", docRef?.id);
      }
    ).catch(
      (err) => { console.error(err); }
    );
}

  subPollList() {
    const q = query(this.getPollRef());
    return onSnapshot(q, (list) => {
      list.forEach(element => {
        this.opinionPolls.push(this.setPollObject(element.data(), element.id));
      });
    });
  }

  setPollObject(obj: any, id: string): SinglePoll {
    return {
      id: id,
      question: obj.question || "", 
      options: obj.options || [], 
      voteCount: obj.voteCount || 0, 
      createdAt: obj.createdAt || Timestamp.now(), 
      duration: obj.duration || "",
    };
  }

  getPollRef() {
    return collection(this.firestore, 'opinion-polls');
  }

  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }

  ngOnDetroy() {
    this.unsubPolls();
  }

  async incrementVoteReceivedAndVoteCount(option: { text: string; votesReceived: number }, poll: SinglePoll) {
    option.votesReceived++;
    poll.voteCount++;
    this.opinionPolls = [];
    let pollRef = doc(collection(this.firestore, 'opinion-polls'), poll.id); 
    await updateDoc(pollRef, this.getCleanJson(poll) ).then(() => {
      console.log('Daten erfolgreich aktualisiert.');
    }).catch((error) => {
      console.error('Fehler beim Aktualisieren der Daten:', error);
    });
  }

  getCleanJson(poll: SinglePoll) {
    return {
      id: poll.id,
      question: poll.question, 
      options: poll.options, 
      voteCount: poll.voteCount, 
      createdAt: poll.createdAt, 
      duration: poll.duration ,
    };
  }

}
