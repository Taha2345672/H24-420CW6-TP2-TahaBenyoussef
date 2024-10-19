import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const CLIENT_ID="6196adb8b2e1453eaf67f3730e9dd10a";
const CLIENT_SECRET="6196adb8b2e1453eaf67f3730e9dd10a";
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyToken ?: string;
  artist?:Artist;
constructor(public http:HttpClient) {

 
 }
async conect(): Promise<void>{
  let body=new HttpParams()
.set('grany_type','client_crendentials');

  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    })
  };

  let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token',     
    body.toString(), httpOptions));
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async searchArtist(artist : string): Promise<any> {
    const httpOptions = {
     headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.spotifyToken
     })
     };
      let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
   console.log(x);
  return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  
    }
    
}
class Artist {
  constructor (public id:string,public name:string,public img:string){}

}




 


