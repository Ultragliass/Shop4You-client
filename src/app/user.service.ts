import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

const BASE_URL = 'http://localhost:4201/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; userData: IUser }> {
    return this.http.post<{ token: string; userData: IUser }>(
      `${BASE_URL}/login`,
      {
        email,
        password,
      }
    );
  }
}
