import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem, IStore } from '../models/store';

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
    return this.http.get<IStore>(BASE_URL);
  }

  getItemsByCategory(
    categoryId: string | null
  ): Observable<{ selectedItems: IItem[]; items: IItem[] }> {
    return this.http.get<{ selectedItems: IItem[]; items: IItem[] }>(
      `${BASE_URL}/${categoryId || 'all'}`,
      { headers: this.getHeaders() }
    );
  }

  searchItems(
    term: string
  ): Observable<{ selectedItems: IItem[]; items: IItem[] }> {
    return this.http.get<{ selectedItems: IItem[]; items: IItem[] }>(
      `${BASE_URL}/search/${term}`,
      { headers: this.getHeaders() }
    );
  }
}
