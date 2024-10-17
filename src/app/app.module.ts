import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from '.c:/Users/2345672/Desktop/H24-420CW6-TP2-TahaBenyoussef/H24-420CW6-TP2-TahaBenyoussef/src/song/song.component';
import { SongComponent } from './song/song.component';

@NgModule({
  declarations: [					
    AppComponent,
      AlbumComponent,
      ArtistComponent,
      ShowComponent,
      SongComponent,
      SongComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
