import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  artistId: string | null;
  albums: any[] = [];
  artistName: string = '';


  constructor(public route: ActivatedRoute, public router: Router, public spotify: SpotifyService) {
    this.artistId = null;
  }

    async ngOnInit() {
      let artistName = this.route.snapshot.paramMap.get('artistName');
      if (artistName) {
        let artist = await this.spotify.getArtistByName(artistName);
        if (artist) {
          this.artistId = artist.id;
          this.artistName = artist.name;
          this.albums = this.spotify.getAlbumsFromLocalStorage(this.artistId);
          if (!this.albums || this.albums.length === 0) {
            this.albums = await this.spotify.getAlbums(this.artistId);
          }
        }
      } else {
        let artistId = this.route.snapshot.paramMap.get('id');
        if (artistId) {
          let artist = await this.spotify.getArtist(artistId);
          if (artist) {
            this.artistName = artist.name;
            this.artistId = artist.id;
            this.albums = this.spotify.getAlbumsFromLocalStorage(this.artistId);
            if (!this.albums || this.albums.length === 0) {
              this.albums = await this.spotify.getAlbums(this.artistId);
            }
          }
        }
      }
    }

    goToSongs(albumId: string) {
      this.router.navigate(['/album', albumId, 'chansons']);
    }

}
