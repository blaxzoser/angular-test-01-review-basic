import { Film } from './film.interface';
import { Support } from './support.interface';
import { Social } from './social.interface';

export interface SwapiResponse {
  message: string;
  result: Film[];
  apiVersion: string;
  timestamp: string;
  support: Support;
  social: Social;
}
