import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as weatherActions from './../actions/weather.actions';
import { WeatherService } from '../../weather.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions, private weatherService: WeatherService) {
  }

  @Effect()
  searchCity$ = this.actions$.pipe(ofType(weatherActions.ADD_CITY),
    map((action: weatherActions.AddWeather) => action.payload),
    switchMap(cityStringInput => {
      return this.weatherService.searchWeatherForCity(cityStringInput)
        .pipe(
          map(weather => new weatherActions.AddWeatherSuccess(weather)),
          catchError(error => of(new weatherActions.AddWeatherFail(error)))
        );
    })
  );

}
