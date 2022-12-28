import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from '../service/warehouse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  formWarehouse: any;

  warehouseArray: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private warehouseService: WarehouseService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.warehouseService.getWarehouse().subscribe(list => {
      this.warehouseArray = list;
    })
  }

  openModal(){
    this.router.navigate(['home/form-warehouse']);
  }

  // deleteWarehouse(id: any){
  //   this.warehouseService.deleteWarehouse(id).
  // }


}
