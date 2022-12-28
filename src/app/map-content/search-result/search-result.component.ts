import { WarehouseService } from './../../service/warehouse.service';
import { DirectionsResponse, Route } from './../../Interfaces/direction.interface';
import { MapService } from './../../service/map.service';
import { PlacesService } from './../../service/places.service';
import { Component, OnInit, Input } from '@angular/core';
import { Feature } from 'src/app/Interfaces/places';
import { AnySourceData, LngLatBounds } from 'mapbox-gl';
import { Warehouse } from 'src/app/Interfaces/warehouse.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  @Input()
  places: Array<Feature> = []

  @Input()
  warehouseList: Array<Warehouse> = [];
  

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    private warehouseService: WarehouseService
  ) { 
  }

  get isLoadingPlaces(){
    return this.placesService.isLoadingPlaces;
  }

  setRoute(value){

  }


  getDirecctions(place: Feature){

    if(!this.placesService.useLocation) throw Error('I cant location')

    const start = this.placesService.useLocation;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end).subscribe(
      (res: DirectionsResponse) => {
        console.log(res)
        this.drawPolyLine(res.routes[0])
      }
    )
  }


  drawPolyLine(route: Route){
    console.log({distance: route.distance / 1000, duration: route.duration /60})

    const map = this.mapService.returnMap()
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => bounds.extend( [lng, lat] ))

    map.fitBounds(bounds, {
      padding: 200
    })


    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Todo: limpiar ruta previa

    map.addSource('RouteString', sourceData);

    map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        "line-color": 'sky blue',
        "line-width": 6
      }
    })
  }


  // Places(){
  //   this.placesService.getPlacesByQuery()
  // }
}
