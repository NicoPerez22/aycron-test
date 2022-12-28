import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from './../../service/warehouse.service';
import { Warehouse } from './../../Interfaces/warehouse.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-table-warehouse',
  templateUrl: './table-warehouse.component.html',
  styleUrls: ['./table-warehouse.component.css']
})
export class TableWarehouseComponent implements OnInit {

  @Input()
  warehouseArray: Array<any> = [];

  p: number = 1;

  constructor(
    private warehouseService: WarehouseService,
    private toastService: ToastrService,
    private storage: Storage
  ){}

  ngOnInit(): void {
  }

  deleteWarehouse(warehouse: Warehouse){
    this.warehouseService.deleteWarehouse(warehouse)
    .then((res) => {
      this.toastService.success('Success!', 'Delete Complete')
    })
    .catch((err) => console.log(err))
  }

  downloadFile(warehouse: any){
    console.log(warehouse)

    const fileName = warehouse;
    const downloadLink = document.createElement('a');
    downloadLink.href = warehouse;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
