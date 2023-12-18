import {ApiEndpointQuery} from '@reduxjs/toolkit/query';
import {store} from '../store';
import {AnyAction} from '@reduxjs/toolkit';

type RTKQEndpoint = ApiEndpointQuery<any, any>;

async function createLoader<T>(fetch: RTKQEndpoint, params?: T) {
  const result = store.dispatch(fetch.initiate(params) as unknown as AnyAction);
  await result.unwrap().then(() => result.unsubscribe());
  return null;
}

export default createLoader;
