import { AppDispatch } from '..';
import axios from "../../axios";
import { IAirport, ServerResponse } from './../../models/models';
import { airportSlice } from './../slices/airportSlice';

export const fetchAirports = (page = 1, count = 50) => {
  return async (dispatch: AppDispatch, ) => {                                  // реализация `thunk` в rtk
    try {
      dispatch(airportSlice.actions.fetching())                                // загрузка началась
      const response = await axios.get<ServerResponse<IAirport>>('airports', {
        params: {page, count} 
      })
      dispatch(airportSlice.actions.fetchSuccess({
        airports: response.data.results,                                             //  список аэропортов
        count: response.data.count
      }
                                                        
      ))                                                                        // окончание загрузки
    } catch (e) {
      dispatch(airportSlice.actions.fetchError(e as Error))
    }
  }
}