import { Component, OnInit } from '@angular/core';

import { FlightsService } from "../../Services/flights.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights = [];

  constructor(private flightService: FlightsService, private router: Router) { 
  }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(){
    this.flightService.getData().subscribe(data => {
      this.flights = data;
    });
  }

  update(){
    
  }

  delete(id: number){
    console.log('entro'+ id);
    this.flightService.delete(id).subscribe(
      res => {
        this.getFlights();
      },
      err => console.log(err)
    )
  }

}
