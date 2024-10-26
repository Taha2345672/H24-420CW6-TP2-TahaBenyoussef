import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './component/artist/artist.component';
import { AlbumComponent } from './component/album/album.component';
import { ShowComponent } from './component/show/show.component';
import { SongComponent } from './component/song/song.component';

const routes: Routes = [

  {path :"",redirectTo:"artist",pathMatch:"full"},
  {path:"artist",component:ArtistComponent},
  {path:"album",component:AlbumComponent},
  {path:"show",component:ShowComponent},
  {path:"song",component:SongComponent},
  {path : "album/:id", component : AlbumComponent},
  { path: 'album/:albumId/chansons', component: SongComponent },
  {path : "album/artist/:artistName", component : AlbumComponent},
  {path : "album/:id/chansons", component : SongComponent},
  {path : "show/:artistName", component : ShowComponent},
  { path: 'song/:id', component: SongComponent },
  { path: 'song/:albumName', component: SongComponent },


   {path : "", redirectTo:"artist", pathMatch:"prefix"}
  


  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
