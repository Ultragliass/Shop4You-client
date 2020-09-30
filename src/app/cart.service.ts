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

  getCart(cartId: string): Observable<{ cartItems: ICartItem[] }> {
    return this.http.get<{ cartItems: ICartItem[] }>(`${BASE_URL}/${cartId}`, {
      headers: this.getHeaders(),
    });
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

  removeItem(
    cartId: string,
    cartItemId: string
  ): Observable<{ cartItemId: string }> {
    return this.http.put<{ cartItemId: string }>(
      `${BASE_URL}/remove_item`,
      { cartId, cartItemId },
      { headers: this.getHeaders() }
    );
  }

  placeOrder(
    cartId: string,
    finalPrice: number,
    deliveryCity: string,
    deliveryStreet: string,
    deliveryDate: Date,
    lastCreditDigits
  ): Observable<{ orderId: string }> {
    return this.http.post<{ orderId: string }>(
      `http://localhost:4201/order`,
      {
        cartId,
        finalPrice,
        deliveryCity,
        deliveryStreet,
        deliveryDate,
        lastCreditDigits,
      },
      { headers: this.getHeaders() }
    );
  }

  printReceipt(orderId: string): Observable<any> {
    return this.http.get(
      `http://localhost:4201/order/print/${orderId}`,
      { headers: this.getHeaders() }
    );
  }
}
