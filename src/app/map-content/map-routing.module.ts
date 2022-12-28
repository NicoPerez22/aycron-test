import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapContentComponent } from './map-content.component';

const routes: Routes = [
  {
    path: '',
    component: MapContentComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MapRoutingModule { }
