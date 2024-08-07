import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { Beauty } from '../models/beauty';

@Injectable({
  providedIn: 'root'
})
export class SelectServiceService {

  constructor(private http:HttpClient) { }

//Load location from json file
  getAllLocation():Observable<Location[]> {
    return this.http.get<Location[]>("../assets/data/quartier.json");
  }

  getAllVille():Observable<Location[]> {
    return this.http.get<Location[]>("../assets/data/ville.json");
  }

  //Load beauty services select element from json file
  getBeautyService():Observable<Beauty[]>{
    return this.http.get<Beauty[]>("../assets/data/location.json")
  }
}
