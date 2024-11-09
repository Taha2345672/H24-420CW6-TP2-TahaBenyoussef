import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  artistName: string = '';
  concerts: any[] = [];
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom: number = 5;
  markers: { position: google.maps.LatLngLiteral; label: string }[] = [];

  constructor(public route: ActivatedRoute, public spotify: SpotifyService) {}

  async ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get('artistName') || '';
    console.log( this.artistName);
    this.concerts = await this.spotify.getConcert(this.artistName);
    console.log( this.concerts);
  

  
    if (this.concerts.length > 0) {
      const firstConcert = this.concerts[0];
      this.center = {
        lat: Number(firstConcert.venue.latitude),
        lng: Number(firstConcert.venue.longitude),
      };
      console.log(this.center);

      
      this.markers = this.concerts.map(concert => ({
        position: {
          lat: Number(concert.venue.latitude),
          lng: Number(concert.venue.longitude),
        },
        label: concert.venue.name,
      }));
      console.log(this.markers);
    }
  }
}
