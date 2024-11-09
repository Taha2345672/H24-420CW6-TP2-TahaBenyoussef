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
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleMapsModule } from '@angular/google-maps';

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
    YouTubePlayerModule,
    FormsModule,
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: { 
        provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
    })
    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http : HttpClient){
  return new TranslateHttpLoader(http);
}
