import {api, ROUTE_NAMES} from '@/lib/api';
import {PagedData} from '@/types';
import buildUrl from 'build-url-ts';
import {EpisodeModel} from './Episode.model';

export class EpisodeService {
  static async loadEpisodes(query: {page: number}) {
    return api
      .get<PagedData<EpisodeModel>>(
        buildUrl(ROUTE_NAMES.EPISODES, {queryParams: query}),
      )
      .then(res => res.data);
  }
}
