import { createSelector } from 'reselect';

import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectHomeState = (state: ApplicationRootState) => state.profile || initialState;

const makeSelectIsLoading = () => createSelector(selectHomeState, (state) => state.loading);

const makeSelectData = () => createSelector(selectHomeState, (state) => state.data);

const makeSelectCompleted = () => createSelector(selectHomeState, (state) => state.completed);

export {
    makeSelectIsLoading,
    makeSelectData,
    makeSelectCompleted,
};
