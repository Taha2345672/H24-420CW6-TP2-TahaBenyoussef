export class Show {

    datetime: string;
    venue: {country: string; city: string; };

    constructor(datetime: string, venue: { country: string, city: string }) {
        this.datetime = datetime;
        this.venue = venue;
    }
}