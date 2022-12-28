import { PlacesService } from './../../service/places.service';
import { MapService } from './../../service/map.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElemnt!: ElementRef

  map: Map

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) { }

  ngAfterViewInit(): void {

    this.map = new Map({
      container: this.mapDivElemnt.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    

    const popup = new Popup()
      .setHTML(`
        <h6>Aque estoy</h6>
      `)
    
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.useLocation) 
      .setPopup( popup )
      .addTo( this.map )

    this.mapService.setMap(this.map)
  }
  
  setMapReloar(){
    this.mapService.setMap(this.map)
  }

}
