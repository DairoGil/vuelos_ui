import { Component, OnInit } from '@angular/core';
import { flight } from 'src/app/Model/flight';
import { AirplaneService } from "../../Services/airplane.service";
import { FlightsService } from "../../Services/flights.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  date: string = "";
  time: string = "";

  flight: flight= {
    planecode: 0,
	  origin: "",
	  destination: "",
	  numVuelo: 0,
	  dateflight: ""
  };
  airplanes = [];

  constructor(private flightservice: FlightsService, private router: Router, private activatedRoute: ActivatedRoute, private airplaneService: AirplaneService) { }

  ngOnInit(): void {
      const params = this.activatedRoute.snapshot.params;

      if(params.id){
          this.flightservice.getFlight(params.id).subscribe(
            res => {
              this.flight = res[0];
              this.date= res[0].dateflight.substring(0,10);
              this.time = res[0].dateflight.substring(11,16);
            },
            err => console.log(err)
          )
      }
      this.getAirplanes();
  }

  getAirplanes(){
    this.airplaneService.getData().subscribe(data =>{
        this.airplanes= data;
      });
  }

  addNewFlight(){
    this.flight.dateflight= this.date +" "+ this.time;
    if(this.flight.numVuelo!=0){
      console.log('update');
      this.flightservice.update(this.flight).subscribe();
    }else{
      console.log('create');
      this.flightservice.add(this.flight).subscribe();
    }

    
    this.router.navigate(["/flights"]);
  }
}
