import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

  getAllProjects(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'projectsData', this.requestOptions);
  }
  getProject(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'projectData', this.requestOptions);
  }
  createProject(project: Project): Observable<any> {
    return this.http.post<any>(this.apiURL + 'projectData', project , this.requestOptions);
  }
  updateProject(project: Project): Observable<any> {
    return this.http.put<any>(this.apiURL + 'projectData', project , this.requestOptions);
  }
  deleteProject(project: Project): Observable<any> {
    return this.http.put<any>(this.apiURL + 'projectData', project , this.requestOptions);
  }
}
