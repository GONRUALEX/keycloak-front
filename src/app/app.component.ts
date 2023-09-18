import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged: boolean ;
  isAdmin: boolean;
  userName: string;
  constructor(private loginService:LoginService){
    this.loginService.configure();

    this.loginService.getAdmin().subscribe(data=>{
      this.isAdmin = data;
    })
    this.loginService.getLogged().subscribe(data=>{
      this.isLogged = data;
      this.userName = this.loginService.getUsername();
    })

}

}
