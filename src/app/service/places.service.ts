import { Route } from './../Interfaces/direction.interface';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Feature, PlacesResponse } from './../Interfaces/places';
import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { catchError, map, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];


  get isUserLocationReady(): boolean {
    return !!this.useLocation
  }

  constructor(
    private toastService: ToastrService,
    private http: HttpClient,
  ) { 
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, rejeect) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude]
          resolve(this.useLocation)
        },
        (err) => {
          this.toastService.error('Could not get geolocation', 'Error');
          console.log(err);
          rejeect();
        }
      )

    })
  }

  getPlacesByQuery(query: string): Observable<PlacesResponse>{
    this.isLoadingPlaces = true;
    return this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?types=place%2Cpostcode%2Caddress&language=es&limit=1&access_token=pk.eyJ1Ijoibmljb3BlcmV6MjIiLCJhIjoiY2xjMTlpemZhMTk2bTN3cGk1aHhnMHM1byJ9.PrBKFD_DjGzZo2clKWfCxw`)
    .pipe(
      map(res => res),
      catchError(err => {
        console.log(err)
        return throwError(err)
      })
    )
  }
}
