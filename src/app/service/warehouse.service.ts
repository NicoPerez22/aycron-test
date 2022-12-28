import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Warehouse } from './../Interfaces/warehouse.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

import { Firestore, collection, doc, getDoc, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private firestore: Firestore, private http: HttpClient) { }

  postWarehouse(value: any): Promise<any>{
    const warehouseRef = collection(this.firestore, 'warehouse');
    return addDoc(warehouseRef, value);
  }

  getWarehouse(): Observable<any[]>{
    const warehouseRef = collection(this.firestore, 'warehouse');
    return collectionData(warehouseRef, {idField: 'id'}) as Observable<any>
  }

  deleteWarehouse(warehouse: Warehouse){
    const warehouseRef = doc(this.firestore, `warehouse/${warehouse.id}`)
    return deleteDoc(warehouseRef);    
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    console.log(formData.append('file', file))

    return null
    // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });

    // return this.http.request(req);
  }

  // async getUserById(user: any): Promise<any>{
  //   const citiesRef = doc(this.firestore, "users", us);
  //   const docSnap = await getDoc(citiesRef);

  //   console.log("Document data:", docSnap.data());
  //   return docSnap.data();
  // }
}
