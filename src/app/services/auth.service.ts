import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor() {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(username: string, password: string): boolean {
    // Hier Authentifizierungslogik implementieren (API-Aufruf etc.)
    // Wenn erfolgreich:
    this.isLoggedInSubject.next(true);
    return true;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  signup(username: string, password: string): boolean {
    // Hier Registrierungslogik implementieren (API-Aufruf etc.)
    // Wenn erfolgreich:
    this.isLoggedInSubject.next(true);
    return true;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

