import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProject} from '../model/user-project';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {

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

  getAllUsersProjects(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'projectsData', this.requestOptions);
  }
  getUserProject(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'projectData', this.requestOptions);
  }
  createUserProject(userProject: UserProject): Observable<any> {
    return this.http.post<any>(this.apiURL + 'projectData', userProject , this.requestOptions);
  }
  updateUserProject(userProject: UserProject): Observable<any> {
    return this.http.put<any>(this.apiURL + 'projectData', userProject , this.requestOptions);
  }
  deleteUserProject(userProject: UserProject): Observable<any> {
    return this.http.put<any>(this.apiURL + 'projectData', userProject , this.requestOptions);
  }
}
