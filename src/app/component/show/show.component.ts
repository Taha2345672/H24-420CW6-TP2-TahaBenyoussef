import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { SpotifyService } from '../../services/Spotify.service';

declare var google: any; 

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  artistName: string | null = null;
  inputLat : number = 0;
  inputLng : number = 0;

  center : google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom : number = 5;

  markerPositions :google.maps.LatLngLiteral[]= [{lat: 42, lng: -4}]

  constructor(public http: HttpClient, public spotify: SpotifyService, public route : ActivatedRoute ) { }  

  async ngOnInit() {   

    this.artistName = await this.route.snapshot.paramMap.get("name")

    if (this.artistName) {
      this.spotify.getConcert(this.artistName).then(() => {this.initializeMap();
      });         
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
      
      this.spotify.concerts.forEach((show: any) => {
        const marker = new google.maps.Marker({
          position: { lat: show.venue.latitude, lng: show.venue.longitude },
          map: map,
          title: show.venue.name
        });
      });
    }
  }
}

