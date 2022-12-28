import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutungModule } from './home-routing.module';
import { TableWarehouseComponent } from './table-warehouse/table-warehouse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormWarehouseComponent } from './form-warehouse/form-warehouse.component';


@NgModule({
  declarations: [HomeComponent, TableWarehouseComponent, FormWarehouseComponent],
  imports: [
    CommonModule,
    HomeRoutungModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
