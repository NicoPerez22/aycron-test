import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{

  notUser: boolean = false;
  user: any;

  constructor(private authService: AuthService, private Router: Router){

  }

  ngOnInit(): void {
    this.authService.stateUser().subscribe((res) => {
      this.user = res

      if(this.user == null || this.user == undefined){
        this.notUser = true;
      }
    })
  }
  
}
