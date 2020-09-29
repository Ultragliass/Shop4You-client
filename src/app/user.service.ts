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
  ): Observable<{
    token: string;
    userData: IUser;
    currentCartDate: Date | undefined;
    lastOrderDate: Date | undefined;
  }> {
    return this.http.post<{
      token: string;
      userData: IUser;
      currentCartDate: Date | undefined;
      lastOrderDate: Date | undefined;
    }>(`${BASE_URL}/login`, {
      email,
      password,
    });
  }

  checkDetails(
    id: string,
    email: string,
    password: string
  ): Observable<{ success: boolean; error?: string }> {
    return this.http.post<{ success: boolean; error?: string }>(
      `${BASE_URL}/check`,
      { id, email, password }
    );
  }

  register(
    id: string,
    email: string,
    password: string,
    city: string,
    street: string,
    name: string,
    lastname: string
  ): Observable<{
    token: string;
    userData: IUser;
    currentCartDate: Date | undefined;
    lastOrderDate: Date | undefined;
  }> {
    return this.http.post<{
      token: string;
      userData: IUser;
      currentCartDate: Date | undefined;
      lastOrderDate: Date | undefined;
    }>(`${BASE_URL}/register`, {
      id,
      email,
      password,
      city,
      street,
      name,
      lastname,
    });
  }

  authenticate(): Observable<{
    userData: IUser;
    currentCartDate: Date | undefined;
    lastOrderDate: Date | undefined;
  }> {
    return this.http.get<{
      userData: IUser;
      currentCartDate: Date | undefined;
      lastOrderDate: Date | undefined;
    }>(`${BASE_URL}/authenticate`, { headers: this.getHeaders() });
  }

  ping(): Observable<{ success: boolean }> {
    return this.http.get<{ success: boolean }>(`${BASE_URL}/ping`, {
      headers: this.getHeaders(),
    });
  }

  createCart(): Observable<{ cartId: string }> {
    return this.http.post<{ cartId: string }>(
      'http://localhost:4201/cart',
      {},
      { headers: this.getHeaders() }
    );
  }
}
