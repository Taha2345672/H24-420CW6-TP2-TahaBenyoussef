import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/artist';

const CLIENT_ID="6196adb8b2e1453eaf67f3730e9dd10a";
const CLIENT_SECRET="6196adb8b2e1453eaf67f3730e9dd10a";
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyToken ?: string;
  artist?:Artist;
  favoriteArtists: Artist[] = [];
  jsonData: string | null = null;

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

    async getArtistByName(name: string): Promise<Artist | null> {
  
      let artistJson = localStorage.getItem(`artist-${name}`);
      if (artistJson != null) {
      
        let artist = JSON.parse(artistJson);
        return new Artist(artist.id, artist.name, artist.imageUrl);
      }
    
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.spotifyToken
        })
      };
    
      let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1`, httpOptions));
      console.log(response);
      if (response.artists.items.length > 0) {
        let artist = new Artist(response.artists.items[0].id, response.artists.items[0].name, response.artists.items[0].images[0].url);
    
        localStorage.setItem(`artist-${name}`, JSON.stringify(artist));
    
        return artist;
      } else {
        return null;
      }
    }
    
    
    async getArtists(){
      this.jsonData = localStorage.getItem("artists");
      if (this.jsonData != null){
    
        this.favoriteArtists = JSON.parse(this.jsonData)
      }
    }
    
    
    async saveArtist(name: string): Promise<void> {
      this.artist = await this.searchArtist(name);
      if(this.artist && this.artist.imageUrl){
        this.favoriteArtists.push(this.artist);
      }
      localStorage.setItem("artists", JSON.stringify(this.favoriteArtists));
      
    }
    
    
    async clearFavoris(): Promise<void> {
      this.favoriteArtists = [];
      localStorage.removeItem("artists");
    }
    
    
    
}


 


