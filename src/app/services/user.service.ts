import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestOptions: any;
  requestOptions1: any;
  private apiURL = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
    this.requestOptions = {
      responseType: 'json'
    };

    this.requestOptions1 = {
      responseType: 'json',
      observe: 'response',
    };
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'usersData', this.requestOptions);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'userData', this.requestOptions);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + 'userData', user , this.requestOptions);
  }
  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.apiURL + 'userData', user , this.requestOptions);
  }
  deleteUser(user: User): Observable<any> {
    return this.http.put<any>(this.apiURL + 'userData', user , this.requestOptions);
  }
}
