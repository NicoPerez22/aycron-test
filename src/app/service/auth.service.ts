import { ToastrService } from 'ngx-toastr';
import { User } from './../Interfaces/user.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Firestore, collection, doc, getDoc, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auhtState$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: Firestore,
    private toastrService: ToastrService
  ) {
    this.auhtState$ = this.afAuth.authState
  }

  postUserInDB(user: any){
    const postUser = new User();
    postUser.email = user.email;
    postUser.password = user.password;
    postUser.idRol = 1;
    postUser.rol = "admin"

    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, Object.assign({}, postUser));

    // return this.firestore.collection('users').add(Object.assign({}, postUser));
  }

  getUserById(): Observable<any[]>{
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, {idField: 'id'}) as Observable<any[]>
  }

  register(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const us = { email, password }
      this.postUserInDB(us)
      this.afAuth.signInWithEmailAndPassword(email, password)
    })
    .catch(err => console.log(err))
  }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((res) => {
    })
    .catch(err => {
      this.toastrService.error('The email or password is incorrect, please try again', 'Error')
      console.log(err)
    })
  }

  logout(){
    this.afAuth.signOut()
  }

  stateUser(){
    return this.auhtState$;
  }
}
