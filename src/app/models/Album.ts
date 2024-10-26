import { Song } from "./Song";
import { Artist } from "./Artist";

export class Album {
    constructor(public id: string, public name: string, public image: string, public songs: Song[] = []){}
}