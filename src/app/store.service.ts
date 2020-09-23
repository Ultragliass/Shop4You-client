import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStore } from '../models/store';
const BASE_URL = 'http://localhost:4201/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getStore(): Observable<IStore> {
    return this.http.get<IStore>(BASE_URL, {
      headers: this.getHeaders(),
    });
  }
}
