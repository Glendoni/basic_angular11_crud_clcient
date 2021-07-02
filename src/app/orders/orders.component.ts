import { Component, OnInit } from '@angular/core';

import { Order } from './order';
import { OrderService } from './order.service';
import {any} from 'codelyzer/util/function';
import {error} from '@angular/compiler/src/util';


@Component({
  selector: 'app-orders',
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  orders$: Order[] = []  ;
  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
        this.orders$ =  orders;
        console.log(orders);
      });
  }

  onDelorder(datum: any): void {
  const originalPriceTotal = this.orders$[0].cost;
  const originalItem  = this.orders$[0].data;


  this.orderService.deleteOrder(datum.id).subscribe((orders) => {
      const index = this.orders$[0].data.findIndex((d: { id: any; }) => d.id === datum.id);
      this.orders$[0].data.splice(index, 1);

      let result = this.orders$[0].data.map(({ price }: {[key: string]: any}) => +price);
      result =   result.reduce(function(acc: any, val: any) { return acc + val; }, 0);
      this.orders$[0].cost = result;
    }
    );

     // to do add error handling


  }
}
