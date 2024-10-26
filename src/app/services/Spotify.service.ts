import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Album } from '../models/Album';
import { Song } from '../models/Song';
import { Artist } from '../models/Artist';


const CLIENT_ID = "d5b0eafe720f49f1b7d026fafc1f9c5e";
const CLIENT_SECRET = "61fa174064ff4e439c9fbc6759a3f105";
const GOOGLE_API_KEY = "AIzaSyA60J7T5sDqgcpviaBchjvyCfQxjolDL9A";
const YOUTUBE_LINK = "https://youtube.com/embed/";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyToken?: string;

  jsonData : string | null = null;
  listArtiste: Artist [] = [];
  artistName : string = "";

  listAlbum: Album [] = [];
  listSong : Song[] = [];
  albumName : string = "";

  concerts: any[] = [];
  

constructor(public http: HttpClient) {}


async connect(): Promise<void> {
let body = new HttpParams()
.set('grant_type', 'client_credentials');
let httpOptions = {
headers: new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)})
};

let response = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token',      
body.toString(), httpOptions));
console.log(response);
this.spotifyToken = response.access_token;
 localStorage.setItem("Key", JSON.stringify(this.spotifyToken));
}

async searchArtist(artist : string): Promise<any> {
  const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + this.spotifyToken})
  };
  let response = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
  console.log(response);
  
  this.listArtiste.push(new Artist(response.artists.items[0].id, response.artists.items[0].name,response.artists.items[0].images[0].url));

  localStorage.setItem("Artiste", JSON.stringify(this.listArtiste));
  return this.listArtiste;

  }
  async addArtist(){
    this.listArtiste = await this.searchArtist(this.artistName)
    console.log(this.listArtiste);
   }
  
   clearFavoris(){
     this.listArtiste = [];
     localStorage.setItem("Artiste", JSON.stringify(this.listArtiste));
   } 

  async getAlbums(artistId: string): Promise<any> {
  const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.spotifyToken})
  };
  
  let response = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/artists/" + artistId + "/albums?include_groups=album,single", httpOptions));
  console.log(response);
   
  for(let i = 0; i < response.items.length; i++){

    this.listAlbum.push(new Album(response.items[i].id, response.items[i].name, response.items[i].images[1].url));  
  }
  localStorage.setItem("Album", JSON.stringify(this.listAlbum));
  return this.listAlbum;
   }
   
async addAlbum(artistId: string){
  
  this.listAlbum = [];
  this.listArtiste = [];
  
  localStorage.setItem("Album", JSON.stringify(this.listAlbum));
   
  this.listAlbum = await this.getAlbums(artistId);
  console.log(this.listAlbum);
}
   
   async getSongs(albumId: string): Promise<Song[]> {
   const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.spotifyToken
    })
   };
    let x = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/albums/" + albumId, httpOptions));
   console.log(x);

    for(let i = 0; i < x.tracks.items.length; i++){
    this.listSong.push(new Song (x.tracks.items[i].id, x.tracks.items[i].name));
  }
  ​
  return this.listSong;
  }
    
async addSong(albumId: string){
  this.listAlbum = [];
  this.listSong = [];
  
    console.log(albumId);
    console.log(this.listSong);

    this.listSong = await this.getSongs(albumId);
  
}

async searchVideoId(songName : string) : Promise<string>{
  
  
  let RESPONSE = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key="+ GOOGLE_API_KEY + "&q=" + songName));
  console.log(RESPONSE);  
  let videoId = RESPONSE.items[0].id.videoId;  
  
console.log(videoId);
  return videoId;  
}

async getConcert(artistName: string){
  this.listAlbum = [];
  this.listArtiste = [];
  this.concerts = [];

  let Concert = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + BANDTOWN_LIN));
  console.log(Concert);
  this.concerts = Concert; 
  
 
  return Concert; 
  
}

}
