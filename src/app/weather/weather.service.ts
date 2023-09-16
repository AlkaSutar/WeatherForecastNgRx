import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../model/weather';
import { catchError } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '56d2432c8cb7ba54b0c9a182ec9d9709'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<Weather> {
    const urlParams: string = [
      `?q=${city}`,
      `cnt=${this.params.cnt}`,
      `units=${this.params.units}`,
      `appid=${this.params.APPID}`
    ].join('&');

    const queryUrl = `${this.url}${urlParams}`;

    return this.http.get<Weather>(queryUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
