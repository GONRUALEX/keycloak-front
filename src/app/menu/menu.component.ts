import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  userName:string;
constructor(public loginService:LoginService){}
  ngOnInit(): void {
    this.loginService.getAdmin().subscribe(data=>{this.isAdmin=data; setTimeout(()=>{this.userName= this.loginService.getUsername(); },60);})
    this.loginService.getLogged().subscribe(data=>{this.isLogged=data})
  }

public login():void{
  this.loginService.login();
}

public logout():void{
  this.loginService.logout();
}
}
