import { Injectable } from '@angular/core';
import { airplane } from "../Model/airplane";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  constructor(private http: HttpClient) { 
    
  }

  getData(){
    return this.http.get<airplane[]>('http://localhost:8080/airplanes/list');
  }

}
