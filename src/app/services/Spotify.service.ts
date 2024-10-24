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
  jsonData: string | null = null;
  favoriteArtists: Artist[] = [];
  artist ?:Artist; 
  
  constructor(public http:HttpClient) { }
  
  async conect(): Promise<void> {
    let body = new HttpParams()
      .set('grant_type', 'client_credentials');
  
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
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
  
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=4&q=' +
  artist, httpOptions));
    console.log(x);
    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  }
  
  
  async getArtistByName(name: string): Promise<Artist | null> {
    
    let artistJson = localStorage.getItem(`artist-${name}`);
    if (artistJson != null) {
      // Si les détails de l'artiste sont dans localStorage, parsez le JSON et renvoyez l'artiste
      let artist = JSON.parse(artistJson);
      return new Artist(artist.id, artist.name, artist.imageUrl);
    }
  
    // Si les détails de l'artiste ne sont pas dans localStorage, faites la requête à l'API Spotify
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
  
      // Stockez les détails de l'artiste dans localStorage pour une utilisation ultérieure
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
  
  
  async getAlbums(artistId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
  
    let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}/albums`, httpOptions));
    console.log(response);
    localStorage.setItem(`albums-${artistId}`, JSON.stringify(response.items));
    return response.items;
  }
  
  getAlbumsFromLocalStorage(artistId: string): any[] {
    let jsonData = localStorage.getItem('albums-${artistId}');
    if (jsonData != null){
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }
  
  
  async getArtist(artistId: string): Promise<Artist | null> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
  
    let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}`, httpOptions));
    console.log(response);
    return new Artist(response.id, response.name, response.images[0].url);
  }
  
  
  async getSongs(albumId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
  
    let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/albums/${albumId}/tracks`, httpOptions));
    console.log(response);
    localStorage.setItem(`songs-${albumId}`, JSON.stringify(response.items));
    return response.items;
  }
  
  getSongsFromLocalStorage(albumId: string): any[] {
    let jsonData = localStorage.getItem(`songs-${albumId}`);
    if (jsonData != null){
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }
  
  async getAlbum(albumId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
  
    let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/albums/${albumId}`, httpOptions));
    console.log(response);
    return response;
  }
  
  }
  
  
  
  