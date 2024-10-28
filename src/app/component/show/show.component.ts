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

<<<<<<< HEAD
  constructor(public http: HttpClient, public spotify: SpotifyService, public route: ActivatedRoute, public translate: TranslateService) {}

  async ngOnInit() {
    this.artistName = await this.route.snapshot.paramMap.get("artistName");
    console.log( this.artistName); 

    if (this.artistName) {
      await this.spotify.getConcert(this.artistName);
      console.log( this.spotify.concerts); 
=======
  constructor(public http: HttpClient,public spotify: SpotifyService,public route: ActivatedRoute,public translate: TranslateService 
  ) {}

  async ngOnInit() {
    this.artistName = await this.route.snapshot.paramMap.get("name");

    if (this.artistName) {
      await this.spotify.getConcert(this.artistName);
>>>>>>> 3d481de9b3fbc694c79aeb7ad56d9542fe467e0a
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
<<<<<<< HEAD
      console.log( mapOptions); 

      if (this.spotify.concerts && this.spotify.concerts.length > 0) {
        for (const show of this.spotify.concerts) {
          console.log( show.venue.name, show.venue.latitude, show.venue.longitude); 
=======

      if (this.spotify.concerts && this.spotify.concerts.length > 0) {
        for (const show of this.spotify.concerts) {
>>>>>>> 3d481de9b3fbc694c79aeb7ad56d9542fe467e0a
          const marker = new google.maps.Marker({
            position: { lat: show.venue.latitude, lng: show.venue.longitude },
            map: map,
            title: show.venue.name
          });
        }
<<<<<<< HEAD
   

    }
  }
  }

=======
      }
    }
  }
>>>>>>> 3d481de9b3fbc694c79aeb7ad56d9542fe467e0a
}
