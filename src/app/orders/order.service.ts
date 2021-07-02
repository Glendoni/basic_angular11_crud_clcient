import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Order } from './order';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class OrderService {
  orderUrl = 'http://localhost:10000/api';  // URL to web api
  public handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
   this.handleError = httpErrorHandler.createHandleError('OrderService');
  }

  /** GET heroes from the server */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl + '/orders')
      .pipe(
        catchError(this.handleError('getOrders', []))
      );
  }
  deleteOrder(id: number): Observable<unknown> {
    const url = `${this.orderUrl + '/orderitems'}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteOrder'))
      );
  }
  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Order[]> {
  //   term = term.trim();
  //
  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //     { params: new HttpParams().set('name', term) } : {};
  //
  //   return this.http.get<Order[]>(this.orderUrl, options)
  //     .pipe(
  //       catchError(this.handleError<Order[]>('searchOrders', []))
  //     );
  // }
  //
  // //////// Save methods //////////
  //
  // /** POST: add a new hero to the database */
  // addHero(hero: Order): Observable<Order> {
  //   return this.http.post<Order>(this.orderUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }
  //
  // /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<unknown> {
  //   const url = `${this.orderUrl}/${id}`; // DELETE api/heroes/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteHero'))
  //     );
  // }
  //
  // /** PUT: update the hero on the server. Returns the updated hero upon success. */
  // updateHero(hero: Order): Observable<Order> {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<Order>(this.orderUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateHero', hero))
  //     );
  // }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
