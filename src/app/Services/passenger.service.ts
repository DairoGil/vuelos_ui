import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { passenger } from "../Model/passenger";
import { list } from "../Model/list";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient) { }

  addPassenger(passenger: passenger){
    return this.http.post(`http://localhost:8080/passenger/add`, passenger);
  }

  addList(list: list){
    return this.http.post(`http://localhost:8080/passenger/addList`, list);
  }

  updatePassenger(passenger: passenger){
    return this.http.post(`http://localhost:8080/passenger/update`, passenger);
  }
  getPassengersFlight(vuelo: number){
    return this.http.get<passenger[]>(`http://localhost:8080/passenger/flight-passenger?numflight=${vuelo}`);
  }

  getPassengers(){
    return this.http.get<passenger[]>(`http://localhost:8080/passenger/list`);
  }

  getPassengersId(id: number){
    return this.http.get<passenger[]>(`http://localhost:8080/passenger/find?id=${id}`);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/passenger/${id}`);
  }
}
