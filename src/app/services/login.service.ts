import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged: Subject<boolean> = new BehaviorSubject(false);
  isAdmin: Subject<boolean> = new BehaviorSubject(false)
  userName:string ="";
  constructor(public oauthService: OAuthService, public messageService:MessageService) { }

  login():void{
    this.oauthService.initImplicitFlowInternal();
  }

  logout():void{
    this.oauthService.logOut();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/keycloak',
    redirectUri: window.location.origin ,
    clientId: 'fronend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    disableAtHashCheck: true,
    showDebugInformation: true,
  };

  configure():void{
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler= new NullValidationHandler;
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(()=>{this.oauthService.tryLogin()})
    .then(()=>{
      setTimeout(()=>{this.sendLogged(this.getIsLogged());
        this.sendAdmin(this.getIsAdmin());
        if(this.oauthService.getIdentityClaims()){
          this.userName = this.oauthService.getIdentityClaims()['preferred_username'];
          this.messageService.sendMessage(this.userName);
        }},500)
    });

  }

  public getIsLogged():boolean{
    return (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidAccessToken())
  }

  public getIsAdmin(): boolean{
    const token = this.oauthService.getAccessToken();
    if (token!=null){
      const payload = token.split('.')[1];
      const payloadDecodeJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodeJson);
      return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
    }
    return false;
  }

  public sendAdmin(value:boolean){
    this.isAdmin.next(value);
  }

  public getAdmin():Observable<boolean>{
    return this.isAdmin.asObservable();
  }

  public sendLogged(value: boolean){
    this.isLogged.next(value);
  }

  public getLogged():Observable<boolean>{
    return this.isLogged.asObservable();
  }

  public getUsername(){
    return this.userName;
  }
}
