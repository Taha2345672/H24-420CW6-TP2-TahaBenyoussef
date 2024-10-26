import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';

const YOUTUBE_LINK = "https://www.youtube.com/embed/";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  albumName: string | null = null;
  videoId: string = "";
  videoUrl?: SafeResourceUrl;
  songName: string = "";

  constructor(public route: ActivatedRoute, public spotify: SpotifyService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.albumName = this.route.snapshot.paramMap.get('albumName');
    console.log('Album Name:', this.albumName); // Log pour débogage

    if (this.albumName) {
      this.spotify.addSong(this.albumName);
    } else {
      console.error('Aucun nom d\'album trouvé.'); // Log d'erreur
    }
  }

  async searchVideo(songName: string): Promise<void> {
    console.log('Searching for video for song:', songName);
    this.videoId = "";
    this.videoId = await this.spotify.searchVideoId(songName);
    this.getSafeUrl();
  }

  async getSafeUrl(): Promise<void> {
    if (this.videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(YOUTUBE_LINK + this.videoId);
    } else {
      console.error('Aucun videoId trouvé.'); // Log d'erreur
    }
  }
}
