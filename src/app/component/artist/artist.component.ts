import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/Spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(public  spotify:SpotifyService,public router : Router) { }
  artistName : string = "";

  async ngOnInit() {
    await this.spotify.conect();

  }
    async searchAndAddArtist() {
      this.spotify.saveArtist(this.artistName);
    }
  
  
    async searchAndAddArtistByName() {
      let artist = await this.spotify.getArtistByName(this.artistName);
      if (artist) {
        let artistExists = this.spotify.favoriteArtists.some(favoriteArtist => artist && favoriteArtist.id === artist.id);
        if (!artistExists) {
          this.spotify.favoriteArtists.push(artist);
          localStorage.setItem("artists", JSON.stringify(this.spotify.favoriteArtists));
        }
      }
    }
  
    async clearFavoriteArtists(): Promise<void> {
      await this.spotify.clearFavoris();
    }
  
    goToAlbums(artistId: string) {
      this.router.navigate(['/album', artistId]);
    }
  
    goToConcerts(artistName: string) {
      this.router.navigate(['/concert', artistName]);
    }
  
  }
  