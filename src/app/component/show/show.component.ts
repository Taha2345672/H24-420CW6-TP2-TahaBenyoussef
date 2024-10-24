import { Component, OnInit } from '@angular/core';
import { BandsInTownService } from '../../services/BandsInTown.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  artistName: string = '';
  concerts: any[] = [];
  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  markers: { position: google.maps.LatLngLiteral, label: string }[] = [];
  zoom: number = 5;
  

  constructor(public route: ActivatedRoute, public bandsInTownService: BandsInTownService) { }

  async ngOnInit() {

    this.artistName = this.route.snapshot.paramMap.get('artistName') || '';
    this.concerts = await this.bandsInTownService.getConcerts(this.artistName);

    this.concerts.forEach(concert => {
      const lat = Number(concert.venue.latitude);
      const lng = Number(concert.venue.longitude);
      this.markers.push({
        position: { lat: lat, lng: lng },
        label: concert.venue.name
      });
    });
    console.log(this.markers)
    if (this.concerts.length > 0) {
      this.center = this.markers[0].position;
    }

  }

}
