import {api, ROUTE_NAMES} from '@/lib/api';
import {PagedData} from '@/types';
import buildUrl from 'build-url-ts';
import {LocationModel} from './Location.model';

export class LocationService {
  static async loadLocations(query: {page: number}) {
    return api
      .get<PagedData<LocationModel>>(
        buildUrl(ROUTE_NAMES.LOCATIONS, {queryParams: query}),
      )
      .then(res => res.data);
  }
}
