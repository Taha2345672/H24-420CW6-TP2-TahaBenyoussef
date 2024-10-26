import { Song } from "./song";
import { Artist } from "./artist";

export class Album {
    constructor(public id: string, public name: string, public image: string, public songs: Song[] = []){}
}
