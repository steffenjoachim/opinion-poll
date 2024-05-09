import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"opinion-poll-7bbe2","appId":"1:639867947187:web:2adf90590a4ec4b86308c6","storageBucket":"opinion-poll-7bbe2.appspot.com","apiKey":"AIzaSyAu3hGTbvAVU77H0UEO9skcJK71ubAvlCI","authDomain":"opinion-poll-7bbe2.firebaseapp.com","messagingSenderId":"639867947187"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
