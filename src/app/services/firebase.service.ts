import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { environment } from '../../environments/environment';

const FIREBASE_KEY = environment.FIREBASE_KEY

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { 
    const firebaseConf ={
      apiKey: FIREBASE_KEY, 
      authDomain: "projetleaflet.firebaseapp.com",
      databaseURL: "https://projetleaflet.firebaseio.com",
      projectId: "projetleaflet",
      storageBucket: "",
      messagingSenderId: "338184040216",
      appId: "1:338184040216:web:34d3bdac5f23773b"    
  }
    firebase.initializeApp(firebaseConf)
    console.log("firebase lancé")
    console.log(FIREBASE_KEY)
  }

  getData(id)
  {
    
    return firebase.database().ref("/"+id).once('value')
    
  }
}
