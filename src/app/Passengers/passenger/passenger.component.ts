import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PassengerService } from "../../Services/passenger.service";
import { passenger } from "../../Model/passenger";
import { list } from "../../Model/list";

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  vuelo = "";
  numFlight=0;
  column = "12";
  offset = " col-md-10";
  passengerList = [];
  newPas = false;
  date= "";
  buscarq= 0;
  list: list={
    id: 0,
    numflight: 0,
    idpassenger: 0
  }
  passenger: passenger= {
    id: 0,
    name: "",
    birthdate: "",
    email: "",
    telephone: 0
  };

  constructor(private activatedRoute: ActivatedRoute, private passengerService: PassengerService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.numflight){
      this.getData(params.numflight);
      this.numFlight =params.numflight;
      this.list.numflight=params.numflight;
    }else{
      this.getData(this.numFlight);
    }
  }

  newPassenger(passenger: passenger){
    const test= this.passengerList.find(element => element.id==passenger.id);
    if(test!=undefined){
      this.passenger.birthdate = this.date.substring(0,10);
      this.passengerService.updatePassenger(this.passenger).subscribe(
        res =>{
          this.getData(this.numFlight);
          this.clean(); 
        },
        err => {
          this.getData(this.numFlight);
          this.clean();   
        }
      );
    }else{
      this.passenger.birthdate = this.date.substring(0,10);
      this.passengerService.addPassenger(this.passenger).subscribe(
        res =>{
          this.getData(this.numFlight);
          this.clean(); 
        },
        err => {
          this.getData(this.numFlight);
          this.clean();   
        }
      );
      this.list.idpassenger= this.passenger.id;
      //this.passengerService.addList(this.list).subscribe();
    }
  }

  getData(numero: number){
    if(numero!=0){
        this.column = "8";
        this.offset = "";
        this.vuelo = ""+numero;
        this.passengerService.getPassengersFlight(numero).subscribe(
          data => {
            this.passengerList = data;
            console.log(data);
          }, err=> console.log(err)
        )
    }else{
      this.passengerService.getPassengers().subscribe(
        data => {
          this.passengerList = data;
          console.log(data);
        }, err=> console.log(err)
      )
    }
  }

  clean(){
    this.newPas = false;
    this.date = "";
    this.numFlight=0;
    this.passenger={
      id: 0,
      name: "",
      birthdate: "",
      email: "",
      telephone: 0
    };
  }
  cargar(id: number){
      this.newPas = true;
      this.passengerService.getPassengersId(id).subscribe(
        data => {
          this.passenger= data[0];
          this.date= this.passenger.birthdate.substring(0,10);
        }
      )
  }

  buscar(id: number){
      this.newPas = true;
      const test= this.passengerList.find(element => element.id==id);
    if(test!=undefined){
      this.passengerService.getPassengersId(id).subscribe(
        data => {
          this.passenger= data[0];
          this.date= this.passenger.birthdate.substring(0,10);
        }
      )
    }else{
      this.clean();
    }
  }

  delete(id: number){
    this.passengerService.delete(id).subscribe(
      res => {
        this.getData(0);
      },
      err => console.log(err)
    )
  }

}
