import { ApiRts } from "#common/@enums/http";
import { Body, ResponseData } from "#common/@types/http";
import { Id, } from "#common/@types/models";

export type FetchOptions<T> = ({ body?: T, token?: string } & Partial<Id>) | undefined;
export type FetchRes<T> = Promise<ResponseData<T>>

// export type ApiArgs<T extends OneOrArray<ApiData>, F extends FetchOptions<T>> 
//     = ApiRouteType<T> extends never
//     ? never
//     : F extends undefined ? [ ApiRouteType<T> ] : [ ApiRouteType<T>, F ];

export type ApiFuncs = {
    get:    <TR>        (rt: ApiRts, opts: Id)             => FetchRes<TR>
    getAll: <TR>        (rt: ApiRts)                       => FetchRes<TR[]>
    post:   <TR, TB>    (rt: ApiRts, opts: Body<TB>)       => FetchRes<TR>
    put:    <TR, TB>    (rt: ApiRts, opts: Body<TB> & Id)  => FetchRes<TR>
    delete: <TR>        (rt: ApiRts, opts: Id)             => FetchRes<TR>
}


export enum FetchState { 
    NotStarted      = "FSTATE_NOTSTARTED", 
    Loading         = "FSTATE_LOADING", 
    Success         = "FSTATE_SUCCESS",
    SuccessMany     = "FSTATE_SUCCESSMANY", 
    Error           = "FSTATE_ERROR", 
}

export type FetchData<T>
    = { state: FetchState.NotStarted                            }
    | { state: FetchState.Loading,                              }
    | { state: FetchState.Success,      data:  ResponseData<T>  }
    | { state: FetchState.SuccessMany,  data:  ResponseData<T[]>  }
    | { state: FetchState.Error,        error: Error            }
