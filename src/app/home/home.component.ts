import { Component, OnInit } from '@angular/core';
import {  AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  userName:string;
  constructor(public messageService: MessageService){

}

ngOnInit(): void {
    this.messageService.getMessage().subscribe(data=>{
      console.log(data)
      this.userName = data.text;
    })
}

}
