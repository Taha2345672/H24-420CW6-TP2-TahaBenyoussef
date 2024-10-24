import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { YouTubeService } from '../../services/YouTube.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  albumId: string | null;
  albumName: string = '';
  songs: any[] = [];
  videoUrl: SafeResourceUrl = '';

  constructor(public route: ActivatedRoute, public spotify:SpotifyService, public youTube: YouTubeService, public sanitizer: DomSanitizer) {
    this.albumId = null;
  }

  async ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    if (this.albumId) {
      let album = await this.spotify.getAlbum(this.albumId);
      this.albumName = album.name;
      this.songs = this.spotify.getSongsFromLocalStorage(this.albumId);
      if (this.songs.length === 0) {
        this.songs = await this.spotify.getSongs(this.albumId);
      }
    }
  }

  async playSong(artistName: string, songName: string) {
    let videoId = await this.youTube.getVideoId(`${artistName} ${songName}`);
    if (videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  }

}
