import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './component/album/album.component';
import { ArtistComponent } from './component/artist/artist.component';
import { ShowComponent } from './component/show/show.component';
import { SongComponent } from './component/song/song.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
