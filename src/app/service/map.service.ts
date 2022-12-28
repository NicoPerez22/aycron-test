import { DirectionsResponse } from './../Interfaces/direction.interface';
import { PlacesResponse, Feature } from './../Interfaces/places';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map
  private markers: Marker[] = []

  get isMapReady(){
    return !!this.map
  }

  constructor(
    private toastService: ToastrService,
    private http: HttpClient,
  ) {}

  setMap(map: Map){
    this.map = map;
  }

  returnMap(){
    return this.map
  }

  flyTo(coords: LngLatLike){
    if(!this.isMapReady) throw Error('Map is not ready');

    this.map.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[]){

    if(!this.map) throw Error('Map is not ready')

    const newMarkers = [];

    for(const place of places){
      const [ lng, lat ] = place.center
      const popup = new Popup()
      .setHTML(
        `
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
        `);
      const newmarker = new Marker({ color: 'green' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map)

      newMarkers.push(newmarker)
    }

    this.markers = newMarkers

  }

  createMarkersFromThreePlaces(places: Feature[]){

    if(!this.map) throw Error('Map is not ready')

    const newMarkers = [];

    for(const place of places){
      const [ lng, lat ] = place.center
      const popup = new Popup()
      .setHTML(
        `
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
        `);
      const newmarker = new Marker()
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map)

      newMarkers.push(newmarker)
    }

    this.markers = newMarkers

  }

  removeMarkers(){
    this.markers.forEach(marker => marker.remove());
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]): Observable<DirectionsResponse>{
    return this.http.get<DirectionsResponse>(`https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?alternatives=true&geometries=geojson&language=es&overview=simplified&steps=true&access_token=pk.eyJ1Ijoibmljb3BlcmV6MjIiLCJhIjoiY2xjMTlpemZhMTk2bTN3cGk1aHhnMHM1byJ9.PrBKFD_DjGzZo2clKWfCxw`)
    .pipe(
      map(res => res)
    )
  }

}
