import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flight } from "../Model/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { 
    
  }

  getData(){
    return this.http.get<flight[]>('http://localhost:8080/flights/list');
  }

  getFlight(id: number){
    return this.http.get<flight[]>(`http://localhost:8080/flights/find?id=${id}`);
  }

  add(flight: flight){
    return this.http.post('http://localhost:8080/flights/add', flight);
  }

  update(flight: flight){
    return this.http.post('http://localhost:8080/flights/update', flight);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/flights/${id}`);
  }
}
