import { ApiRts, Method } from "#common/@enums/http/index"
import { ResponseData, Body } from "#common/@types/http/index";
import { CourseData, GroupData, Id, ApiData, UserData } from "#common/@types/models";

const BASE_URL = `http://localhost:8080/api`;

type FetchOptions<T> = ({ body?: T, token?: string } & Partial<Id>) | undefined;
const _fetch = async <TRes, TOpts extends FetchOptions<TRes>> (route: ApiRts, method: Method, options?: TOpts ) =>
    fetch(`${BASE_URL}/${route}${ options?.id !== undefined ? "/"+options?.id : "" }`, {
        method,
        mode: "cors",
        body: JSON.stringify(options?.body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": options?.token
        } as HeadersInit
    })
    .then(res => res.json() as ResponseData<TRes>);

type ApiRouteType<T extends ApiData> 
    = T extends UserData    ? ApiRts.Users  
    : T extends CourseData  ? ApiRts.Courses
    : T extends GroupData   ? ApiRts.Groups 
    : never;

type ApiArgs<T extends ApiData, F extends FetchOptions<T>> 
    = ApiRouteType<T> extends never
    ? never
    : F extends undefined ? [ ApiRouteType<T> ] : [ ApiRouteType<T>, F ];

type ApiFunc<TRes extends ApiData, TOpts extends FetchOptions<TRes>> = 
    <TRes>(args: ApiArgs<TRes, TOpts>) => Promise<ResponseData<TRes>>

type ApiFuncs = {
    get:    ApiFunc<ApiData, Id>,
    getAll: ApiFunc<ApiData, undefined>,
    post:   ApiFunc<ApiData, Body<ApiData>>,
    put:    ApiFunc<ApiData, Body<ApiData & Id>>,
    delete: ApiFunc<ApiData, Id>
}

const API = Object.freeze({
    get:    <T extends ApiData>(args: ApiArgs<T, Id>) : Promise<ResponseData<T>> => 
                _fetch<T, Id>(args[0], Method.GET, args[1]),
    
    getAll: <T extends ApiData>(args: ApiArgs<T, undefined>) : Promise<ResponseData<T[]>> =>
                _fetch<T[], never>(args[0], Method.GET, undefined),
    
    post:   <T extends ApiData>(args: ApiArgs<T, Body<T>>) : Promise<ResponseData<T>> => 
                _fetch<T, Body<T>>(args[0], Method.POST, args[1]),

    put:    <T extends ApiData>(args: ApiArgs<T, Body<T> & Id>) : Promise<ResponseData<T>> =>
                _fetch<T, Body<T> & Id>(args[0], Method.PUT, args[1]),

    delete: <T extends ApiData>(args: ApiArgs<T, Id>) : Promise<ResponseData<T>> =>
                _fetch<T, Id>(args[0], Method.DELETE, args[1]),
}) as ApiFuncs;

export { API };