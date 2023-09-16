import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../model/weather';
import { Store } from '@ngrx/store';
import * as fromStore from './store';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (citySearchEmitter)="citySearch($event)"></app-search>
  <app-results [weather$]="cities$"></app-results>  `
})

export class WeatherContainer {

  
  cities$: Observable<Weather[]>;

  constructor(private store: Store<fromStore.WeatherState>) {}

  ngOnInit() {
    this.cities$ = this.store.select(fromStore.getAllWeatherAsArray);
  }

  citySearch(input: string) {
    this.store.dispatch(new fromStore.AddWeather(input));
  }
}
