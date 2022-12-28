import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapsComponent } from './maps/maps.component';
import { MapContentComponent } from './map-content.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';



@NgModule({
  declarations: [MapsComponent, MapContentComponent, SearchResultComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MapModule { }
