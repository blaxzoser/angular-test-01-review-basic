import { FilmProperties } from './film-properties.interface';

export interface Film {
  properties?: FilmProperties;
  _id: string;
  description?: string;
  uid?: string;
  genre:string;
  year:number;
  title:string;
  __v?: number;
}
