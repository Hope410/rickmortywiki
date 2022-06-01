import axios from 'axios';

import {REST_URL} from './config';

export const api = axios.create({
  baseURL: REST_URL,
});
