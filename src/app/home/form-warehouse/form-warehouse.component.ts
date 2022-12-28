import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from './../../service/warehouse.service';
import { UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-form-warehouse',
  templateUrl: './form-warehouse.component.html',
  styleUrls: ['./form-warehouse.component.css']
})
export class FormWarehouseComponent implements OnInit {

  formWarehouse: any;
  warehouseArray: Array<any> = [];
  files: Array<any> = [];
  filesArray: Array<any> = [];
  urlFilesArray: Array<any> = [];
  urlFile: string

  constructor(
    private fb: UntypedFormBuilder,
    private warehouseService: WarehouseService,
    private toastr: ToastrService,
    private router: Router,
    private storage: Storage
  ){}

  ngOnInit(): void {
    this.createFormWarehouse();
  }

  onSubmitForm(){
    const warehouse = this.prepareSaveFormWarehouse();

    var res:any = [];
    const number = warehouse.code
    res = this.warehouseArray.filter(elem => elem.code == number)


    for(let item of this.filesArray){
      warehouse.files.push(item)
    }

    console.log(warehouse)

    if(res.length > 0){
      this.toastr.warning('El elemento ya existe')
    } else {
      this.warehouseService.postWarehouse(warehouse).then((res) => {
        this.toastr.success('Worehouse is save', 'Success');
        this.router.navigate(['/home']);
      }).catch(error => {
        console.log(error)
        this.toastr.error('As Ocurred error', 'Error')
      })
    }
  }

  prepareSaveFormWarehouse(){
    const formValue = this.formWarehouse.value;

    const saveForm = {
      name: formValue.name,
      code: formValue.code,
      address: formValue.address,
      state: formValue.state,
      country: formValue.country,
      zip: formValue.zip,
      files: []
    }

    return saveForm;
  }

  createFormWarehouse(){
    this.formWarehouse = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: [''],
      zip: [''],
    })
  }

  selectFile(event: any): void {
    const file = event.target.files[0];
    this.files.push(file)
    const imgRef = ref(this.storage, `files/${file.name}`);
    uploadBytes(imgRef, file)
    .then(res => {
      console.log(res)
      setTimeout(() => {
        this.getImages(res.metadata.name)
      }, 500)
    })
    .catch(error => console.log(error))
  }

  getImages(file){
    getDownloadURL(ref(this.storage, `files/${file}`))
    .then((url) => {
      console.log(url)
      this.filesArray.push(url)
    })
    .catch((error) => {
      // Handle any errors
    });

    // const imagesRef = ref(this.storage, 'files');
    // listAll(imagesRef)
    // .then(async res => {

    //   for(let item of res.items){
    //     const file = this.filesArray.find(elem => elem.name == item.name)
    //     const url = await getDownloadURL(file)
    //   }
    // })
    // .catch(error => console.log(error))
  }

  backToHome(){
    window.history.back();
  }

  validarFormControl(formControl: FormControl) {
    return formControl.valid || formControl.touched
  }

  get name(): FormControl {
    return this.formWarehouse.get('name')
  }

  get code(): FormControl {
    return this.formWarehouse.get('code')
  }

  get adddress(): FormControl {
    return this.formWarehouse.get('adddress')
  }

  get state(): FormControl {
    return this.formWarehouse.get('state')
  }

  get country(): FormControl {
    return this.formWarehouse.get('country')
  }

  get zip(): FormControl {
    return this.formWarehouse.get('zip')
  }
}
