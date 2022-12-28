import { AuthService } from '../../service/auth.service';
import { UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegisterUser: any;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.createformLoginUser();
  }

  createformLoginUser(){
    this.formRegisterUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.formRegisterUser.valid){
      const { email, password } = this.formRegisterUser.getRawValue();
      console.log(email, password)
      this.authService.register(email, password)
      .then((user) => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.navigate(['/home'])
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      this.formRegisterUser.markAllAsTouched();
    }
    
  }

  get email(): FormControl {
    return this.formRegisterUser.get('email')
  }

  get password(): FormControl {
    return this.formRegisterUser.get('password')
  }

}
