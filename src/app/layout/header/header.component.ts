import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  notUser: boolean = false;
  isAdmin: boolean = false;
  user: any

  constructor(private authService: AuthService, private Router: Router){

  }

  ngOnInit(): void {
    this.authService.stateUser().subscribe((res) => {
      this.user = res
      this.authService.getUserById().subscribe((users) => {
        const aUser = users.find(elem => elem.email == this.user.email)
        
        if(aUser.idRol == 1){
          this.isAdmin = true;
        }

      })
    })
  }

  logout(){
    this.authService.logout()
    this.Router.navigate(['/auth/login']);
  }
}
