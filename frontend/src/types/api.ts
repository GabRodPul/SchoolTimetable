import { ApiRts } from "#common/@enums/http";
import { Body, ResponseData } from "#common/@types/http";
import { ApiData, CourseData, GroupData, Id, UserData } from "#common/@types/models";

export type OneOrArray<T>   = T | T[]
export type FetchOptions<T> = ({ body?: T, token?: string } & Partial<Id>) | undefined;
export type FetchRes<T extends OneOrArray<ApiData>> = Promise<ResponseData<T>>

export type ApiRouteType<T extends OneOrArray<ApiData>> 
    = T extends OneOrArray<UserData  >  ? ApiRts.Users  
    : T extends OneOrArray<CourseData>  ? ApiRts.Courses
    : T extends OneOrArray<GroupData >  ? ApiRts.Groups 
    : never;

// export type ApiArgs<T extends OneOrArray<ApiData>, F extends FetchOptions<T>> 
//     = ApiRouteType<T> extends never
//     ? never
//     : F extends undefined ? [ ApiRouteType<T> ] : [ ApiRouteType<T>, F ];

export type ApiFuncs = {
    get:    <TRes extends ApiData>  (rt: ApiRouteType<TRes>, opts: Id)              => FetchRes<TRes>
    getAll: <TRes extends ApiData[]>(rt: ApiRouteType<TRes>)                        => FetchRes<TRes>
    post:   <TRes extends ApiData>  (rt: ApiRouteType<TRes>, opts: Body<TRes>)      => FetchRes<TRes>
    put:    <TRes extends ApiData>  (rt: ApiRouteType<TRes>, opts: Body<TRes> & Id) => FetchRes<TRes>
    delete: <TRes extends ApiData>  (rt: ApiRouteType<TRes>, opts: Id)              => FetchRes<TRes>
}


export enum FetchState { NotStarted, Loading, Success, Error, }

export type FetchData<T extends ApiData>
    = { state: FetchState.NotStarted                            }
    | { state: FetchState.Loading,                              }
    | { state: FetchState.Success,      data: ResponseData<T>   }
    | { state: FetchState.Error,        error: Error            }
