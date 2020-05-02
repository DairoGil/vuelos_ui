import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightsComponent } from './Flight/flights/flights.component';
import { PassengerComponent } from './Passengers/passenger/passenger.component';
import { AddFlightComponent } from "./Flight/add-flight/add-flight.component";


const routes: Routes = [
  {path: "flights", component: FlightsComponent},
  {path: "passenger/:numflight", component: PassengerComponent},
  {path: "passengers", component: PassengerComponent},
  {path: "flights/add", component: AddFlightComponent},
  {path: "flights/edit/:id", component: AddFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
