import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public route: ActivatedRoute, public spotify: SpotifyService, public sanitizer: DomSanitizer,public translate:TranslateService) { }

  ngOnInit() {
    this.albumName = this.route.snapshot.paramMap.get('albumName');
    console.log( this.albumName); 

    if (this.albumName) {
      this.spotify.addSong(this.albumName);

    
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
      console.log(this.videoId)
   
  }

  
}
}
