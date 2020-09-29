import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from '../models/cartItem';

const BASE_URL = 'http://localhost:4201/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addItem(
    itemId: string,
    amount: number,
    cartId: string
  ): Observable<{ cartItem: ICartItem }> {
    return this.http.post<{ cartItem: ICartItem }>(
      `${BASE_URL}/add_item`,
      { itemId, amount, cartId },
      { headers: this.getHeaders() }
    );
  }
}
