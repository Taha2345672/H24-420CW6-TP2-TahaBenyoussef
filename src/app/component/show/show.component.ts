import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
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
  inputLat: number = 0;
  inputLng: number = 0;

  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom: number = 5;

  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 42, lng: -4 }];

  constructor(public http: HttpClient,public spotify: SpotifyService,public route: ActivatedRoute,public translate: TranslateService 
  ) {}

  async ngOnInit() {
    this.artistName = await this.route.snapshot.paramMap.get("name");

    if (this.artistName) {
      await this.spotify.getConcert(this.artistName);
      this.initializeMap();
    }
  }

  initializeMap() {
    const mapOptions = {
      center: { lat: 42, lng: -4 },
      zoom: 5
    };
    const mapElement = document.getElementById('map');

    if (mapElement) {
      const map = new google.maps.Map(mapElement, mapOptions);

      if (this.spotify.concerts && this.spotify.concerts.length > 0) {
        for (const show of this.spotify.concerts) {
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
