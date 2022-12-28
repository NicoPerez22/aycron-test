import { FormWarehouseComponent } from './form-warehouse/form-warehouse.component';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'form-warehouse',
    component: FormWarehouseComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HomeRoutungModule { }
