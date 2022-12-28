import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WarehouseService } from '../service/warehouse.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [WarehouseService],
  exports: [MainLayoutComponent]
})
export class SharedModule { }
