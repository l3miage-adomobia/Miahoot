import { Injectable } from '@angular/core';
import { MiahootUser } from 'src/MiahootUser';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export const MiahootUserConverter = FirestoreDataConverter<MiahootUser> = {
  toFireStore(user : MiahootUser) : any {
      return {
        name : user.name,
        photoURL : user.photoURL
      };
  },
  fromFireStore(snapshot: QueryDocumentSnapshot<DocumentData>,options?: SnapshotOptions) : MiahootUser {
    //récupérer les données d'un document Firestore sous forme d'objet JSON. valeur defaut : undefined
    const data = snapshot.data(options);
    const name = data.name ?? '';
    const photoURL = data.photoURL ?? '';
    return { name, photoURL };
  }
}
export class DataService {

  constructor() { }
}
