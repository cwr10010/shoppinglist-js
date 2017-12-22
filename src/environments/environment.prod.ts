import { TRACE, DEBUG, INFO, WARN, ERROR } from '../app/_models/loglevel';

export const environment = {
  production: true,
  loglevel: WARN,
  apiUrl: '/api'
};
