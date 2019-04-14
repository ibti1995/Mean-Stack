/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';/*leeeezma ma te5dem ken ki yabda 3anna 
el service mte3na fel app.module */
/*
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUserUrl = "http://localhost:3000/user/subscribe";

  constructor(private http: HttpClient) { }

  registerUser(user) {

    /*any ma3neha mta3 ay type 
    wel parametre loul houa l urs w theni houa l objet mte3na 
    el ge ma yab3athch donnee  */
  /*  return this.http.post<any>(this._registerUserUrl,user);
  }
}*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUserUrl = "http://localhost:3000/user/subscribe";
  private _loginUserUrl="http://localhost:3000/user/login";
  private _logoutUserUrl="http://localhost:3000/user/logout";
  private _infoUser="http://localhost:3000/user/info/";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUserUrl,user);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUserUrl,user);

  }
info(user){
  return this.http.post<User>(this._infoUser+user._id,user);
}
logout(token){
  return this.http.post<any>(this._logoutUserUrl,token);
}
}

