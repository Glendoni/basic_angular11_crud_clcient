import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import {MessageService} from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [  HttpErrorHandler, HttpErrorHandler,
    MessageService,
    { provide: 'ORIGIN_URL', useValue: location.origin },
    OrdersComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
