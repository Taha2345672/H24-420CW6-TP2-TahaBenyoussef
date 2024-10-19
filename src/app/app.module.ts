import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from './song/song.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [					
    AppComponent,
      AlbumComponent,
      ArtistComponent,
      ShowComponent,
      SongComponent

      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
