import {api, ROUTE_NAMES} from '@/lib/api';
import {PagedData} from '@/types';
import buildUrl from 'build-url-ts';
import {CharacterModel} from './Character.model';

export class CharacterService {
  static async loadCharacters(query: {page: number}) {
    return api
      .get<PagedData<CharacterModel>>(
        buildUrl(ROUTE_NAMES.CHARACTERS, {queryParams: query}),
      )
      .then(res => res.data);
  }
}
