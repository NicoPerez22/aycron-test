import { LngLatBounds, AnySourceData } from 'mapbox-gl';
import { Route, DirectionsResponse } from './../Interfaces/direction.interface';
import { Warehouse } from './../Interfaces/warehouse.interface';
import { WarehouseService } from './../service/warehouse.service';
import { Feature, PlacesResponse } from './../Interfaces/places';
import { MapService } from './../service/map.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl } from '@angular/forms';
import { PlacesService } from '../service/places.service';

@Component({
  selector: 'app-map-content',
  templateUrl: './map-content.component.html',
  styleUrls: ['./map-content.component.css']
})
export class MapContentComponent implements OnInit {

  private debouncedTimer: NodeJS.Timeout;
  
  warehouseList: Array<Warehouse> = [];
  places: Array<Feature> = [];
  placesWarehouse: Array<Feature> = [];
  layersList: Array<any> = [];
  listPlaces: Array<Feature> = [];
  listFeature: Array<any> = [];

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
  }

  goMyLocation(){
    if(!this.placesService.isUserLocationReady) throw Error('Is not location user')
    if(!this.mapService.isMapReady) throw Error('map is not avaible')

    this.mapService.flyTo(this.placesService.useLocation)
  }


  onQueryChangedPlaces(query: string){
    if(this.debouncedTimer) clearTimeout(this.debouncedTimer)

    this.debouncedTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query).subscribe((res: PlacesResponse) => {
        this.places = res.features;
        this.mapService.createMarkersFromPlaces(this.places)
      })

      this.getWarehouseInDataBase()

    }, 500)
  }

  getWarehouseInDataBase(){
    this.warehouseService.getWarehouse().subscribe(res => {
      this.warehouseList = res

      this.warehouseList.forEach((elem) => {
        const address: string = elem.address + "," + elem.country + "," + elem.state
        this.placesService.getPlacesByQuery(address).subscribe((res: PlacesResponse) => {
          this.placesWarehouse = res.features;

          this.placesWarehouse.forEach(elem => {
            this.convertRouteObject(elem);
          })
          
        })
      })
    });
    // this.drawPolyLine()
  }

  convertRouteObject(place){

    this.listPlaces.push(place)
    const start = this.places[0].center as [number, number]; //Direccion ingresada
    const end = place.center as [number, number]; //Depositos

    this.mapService.getRouteBetweenPoints(start, end).subscribe(
      (res: DirectionsResponse) => {
        const json = {
          place: place,
          route: res.routes[0]
        }
        this.listFeature.push(json)
      }
    )
  }

  drawPolyLine(){

    const res = this.listFeature.sort((a,b) => a.route.distance - b.route.distance)

    for (let index = 0; index <= 2; index++) {

      const route: Route = res[index].route;
      const place: Array<Feature> = [];

      place.push(res[index].place)

      const map = this.mapService.returnMap()
      const coords = route.geometry.coordinates;
  
      const bounds = new LngLatBounds();
      coords.forEach( ([lng, lat]) => bounds.extend( [lng, lat] ))
  
      map.fitBounds(bounds, {
        padding: 200
      })

      this.mapService.createMarkersFromThreePlaces(place)
      const color = this.getRandomColor()
  
      // //Polyline
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

      console.log("SourceData:", sourceData)
  
      
      map.addSource(res[index].place.id, sourceData);
      map.addLayer({
        id: res[index].place.id,
        type: 'line',
        source: res[index].place.id,
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          "line-color": color,
          "line-width": 6
        }
      })

      this.layersList.push(res[index].place.id)

    }
  

  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  removeAll(){
    this.warehouseList = [];
    this.places = [];
    this.placesWarehouse = [];
    const map = this.mapService.returnMap()
    this.layersList.forEach(layer => {
      map.removeLayer(layer);
      map.removeSource(layer);
    })
    this.mapService.removeMarkers();
  }


}
