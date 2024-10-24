
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandsInTownService {

  constructor(public http:HttpClient) { }

  async getConcerts(artistName: string): Promise<any> {
    const apiKey = '2b32475766802ac01eefda45e9e42e3';
   
    const response = await lastValueFrom(this.http.get<any>(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${apiKey}`));
    console.log("reponse");                                 
    console.log(response);
    console.log(artistName);
    return response;
  }
  
  }