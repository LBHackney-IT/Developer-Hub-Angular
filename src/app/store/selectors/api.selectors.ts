import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IApiState } from '../state/api.state';

const selectApiState = (state: IAppState) => state.api;

export const selectApiList = createSelector(
    selectApiState,
    (state: IApiState) => state.apis
);

export const selectApi = createSelector(
    selectApiState,
    (state: IApiState, id) => state.apis.find(item => item.id === id)
);
