import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { YouTubeService } from '../../services/YouTube.service';

const YOUTUBE_LINK = "https://www.youtube.com/embed/";
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  albumName: string | null = null;
  videoId : string = "";
  videoUrl ?: SafeResourceUrl;
  songName: string =  "";

  constructor(public route: ActivatedRoute, public spotify:SpotifyService, public youTube: YouTubeService, public sanitizer: DomSanitizer) {
    }

    ngOnInit() {

      this.albumName = this.route.snapshot.paramMap.get('albumName');
      
      if (this.albumName) {
       this.spotify.addSong(this.albumName);
      }
  
    }
  
    async searchVideo(songName: string):Promise<void>{
  
      console.log(songName);
      this.videoId = ""; 
      this.videoId = await this.spotify.searchVideoId(this.songName); 
      this.getSafeUrl();
    }
  
    async getSafeUrl() : Promise<void>{      
      
      this.videoUrl = await this.sanitizer.bypassSecurityTrustResourceUrl(YOUTUBE_LINK + this.videoId);
    }
  }