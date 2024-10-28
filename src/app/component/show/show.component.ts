import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';
import { TranslateService } from '@ngx-translate/core';

declare var google: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  artistName: string | null = null;
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom: number = 5;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public http: HttpClient,
    public spotify: SpotifyService,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  async ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    console.log(this.artistName);

    if (this.artistName) {
      await this.spotify.getConcert(this.artistName);
      console.log(this.spotify.concerts);
      this.initializeMap();
    }
  }

  initializeMap() {
    const mapOptions = {
      center: this.center,
      zoom: this.zoom
    };
    const mapElement = document.getElementById('map');

    if (mapElement) {
      const map = new google.maps.Map(mapElement, mapOptions);

      if (this.spotify.concerts && this.spotify.concerts.length > 0) {
        for (const show of this.spotify.concerts) {
          console.log(show.venue.name, show.venue.latitude, show.venue.longitude);
          const marker = new google.maps.Marker({
            position: { lat: show.venue.latitude, lng: show.venue.longitude },
            map: map,
            title: show.venue.name
          });
        }
      }
    }
  }
}
