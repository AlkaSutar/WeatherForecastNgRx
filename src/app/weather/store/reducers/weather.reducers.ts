import * as fromWeather from '../actions/weather.actions';
import { Weather } from '../../../model/weather';

export interface WeatherState {
  entities: { [id: string]: Weather };
}

export const initialState: WeatherState = {
  entities: {}
};

export function reducer(state = initialState, action: fromWeather.WeatherActions) {

  switch (action.type) {

    case fromWeather.ADD_CITY: {
      console.log(state);

      return {
        ...state,
      };
    }

    case fromWeather.ADD_CITY_SUCCESS: {
      console.log(action);
      const newEntities = { ...state.entities };
      console.log(newEntities);
      let loading: boolean =true;
        newEntities[action.payload.city.name] = action.payload;

      return { ...state, entities: newEntities };
    }

    case fromWeather.ADD_CITY_FAIL: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

// export a slice of data
export const getWeatherEntities = (state: WeatherState) => state.entities;
