import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SpotifyService } from '../../services/Spotify.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  spotifyToken?: string;
  artistName: string= "";
  artist ?:Artist;
  imageUrl: string = ""; 
  

  constructor(public http: HttpClient, public spotify: SpotifyService ) { }    

    ngOnInit() {

      this.spotify.connect(); 

  }

  async addArtist(){
  this.spotify.listArtiste = await this.spotify.searchArtist(this.artistName)
  console.log(this.spotify.listArtiste)
  }

  clearFavoris(){
    this.spotify.listArtiste = [];
    localStorage.setItem("Artist", JSON.stringify(this.spotify.listArtiste));
  } 

}

