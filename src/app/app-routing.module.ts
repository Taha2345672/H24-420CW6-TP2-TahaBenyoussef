import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './component/artist/artist.component';
import { AlbumComponent } from './component/album/album.component';
import { ShowComponent } from './component/show/show.component';
import { SongComponent } from './component/song/song.component';

const routes: Routes = [

  {path :"",redirectTo:"artist",pathMatch:"full"},
  {path:"artist",component:ArtistComponent},

  {path : "album/:id", component : AlbumComponent},


  {path : "show/:artistName", component : ShowComponent},
  { path: 'song/:albumName', component: SongComponent },



  


  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
