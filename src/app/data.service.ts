import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import {
  docData,
  getDoc,
  Firestore,
  FirestoreDataConverter,
} from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

import { MiahootUser } from './MiahootUser';
import { Observable, throwError, of, switchMap } from 'rxjs'; //Import de Observable et de throwError

const convMiahoot: FirestoreDataConverter<MiahootUser> = {
  toFirestore: (MU) => MU,
  fromFirestore: (snap) => ({
    name: snap.get('name') ?? '',
    photoURL: snap.get('photoURL') ?? '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  obsMiahootUser: Observable<MiahootUser | undefined>;

  constructor(private auth: Auth, private fireS: Firestore) {

    this.obsMiahootUser = authState(this.auth).pipe(
      switchMap((user)=> {
        if(user == null){
          return of(undefined);
        }else {
          const docId = `users/${user.uid}`
          const docUser = doc(this.fireS, docId).withConverter(convMiahoot)

          return docData(docUser)
        }
      })
    )

    authState(this.auth).subscribe(async user=> {
      if(user != null){
        const docId = `users/${user.uid}`
        const docUser = doc(this.fireS , docId).withConverter(convMiahoot)
        const snapUser = await getDoc(docUser);

        if (!snapUser.exists()){
          setDoc(docUser, {
            name : user.displayName ?? user.email ?? user.uid,
            photoURL : user.photoURL ?? ''
          })
        }
      }
    })
  }

    
}