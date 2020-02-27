import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {APIConfig} from '../api.config';

const AUTH_PATH = `${APIConfig.BASE_API_PATH}/api/auth`;

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public veryifyUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${AUTH_PATH}`, {
      username: username,
      password: password
    });
  }
}
