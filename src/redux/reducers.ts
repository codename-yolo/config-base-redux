import { AnyAction, combineReducers, Reducer } from 'redux';

import globalReducer from './global/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const createReducer: (injectedReducers: {
    [key: string]: Reducer<any, AnyAction>;
}) => Reducer<any, AnyAction> = (injectedReducers = {}) => {
    console.log('create Reducer', 'value', injectedReducers);
    return combineReducers({
        global: globalReducer,
        ...injectedReducers,
    });
};

export default createReducer;
