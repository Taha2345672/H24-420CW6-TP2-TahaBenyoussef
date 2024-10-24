import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(public http: HttpClient) { }

  async getVideoId(searchQuery: string): Promise<string> {
    const response = await lastValueFrom(this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&key=AIzaSyCniZyPIf2w4ClIOpxHIZ0jxhHGTu1KuI0&q=${searchQuery}`));
    if (response.items.length > 0) {
      return response.items[0].id.videoId;
    } else {
      return '';
    }
  }
  }