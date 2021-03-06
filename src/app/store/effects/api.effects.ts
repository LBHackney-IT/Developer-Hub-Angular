import { Injectable } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EApiActions, GetApiList, GetApiListSuccess, DeleteApi, DeleteApiSuccess, AddApiSuccess, AddApi } from '../actions/api.actions';
import { switchMap, concatMap } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import { IApi } from 'src/app/interfaces/IApi';
import { ApiService } from '../../services/api.service';

@Injectable()
export class ApiEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    @Effect()
    getApiList$ =
        this.actions$.pipe(
            ofType<GetApiList>(EApiActions.GetApiList),
            switchMap(() => this.apiService.getListOfApis()),
            switchMap((response: IApi[]) => of(new GetApiListSuccess(response)))
        );

    @Effect()
    deleteApi$ =
        this.actions$.pipe(
            ofType<DeleteApi>(EApiActions.DeleteApi),
            switchMap((action: DeleteApi) => this.apiService.deleteApi(action.payload)),
            switchMap((response: string) => of (new DeleteApiSuccess(response)))
        );

    @Effect()
    addApi$ =
        this.actions$.pipe(
            ofType<AddApi>(EApiActions.AddApi),
            switchMap((action: AddApi) => this.apiService.putApi(action.payload)),
            switchMap((response: IApi) => of( new AddApiSuccess(response)))
        );
}
