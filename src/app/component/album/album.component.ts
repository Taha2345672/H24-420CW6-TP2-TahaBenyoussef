import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  artistName: string= "";
  
  constructor(public http: HttpClient, public spotify: SpotifyService, public route : ActivatedRoute ) { }  

  async ngOnInit() {
    
    const artistId  = this.route.snapshot.paramMap.get("id")
   
    
    if (artistId) {
      this.spotify.addAlbum(artistId);
      
    }   

  }
}


 

