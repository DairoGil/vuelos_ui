import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './Flight/flights/flights.component';
import { PassengerComponent } from './Passengers/passenger/passenger.component';

import { FlightsService } from "./Services/flights.service";
import { AddFlightComponent } from './Flight/add-flight/add-flight.component';
import { TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/internacional/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    PassengerComponent,
    AddFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
