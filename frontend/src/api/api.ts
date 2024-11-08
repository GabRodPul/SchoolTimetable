import { ApiRts, Method } from "#common/@enums/http/index"
import { ResponseData, Body } from "#common/@types/http/index";
import { CourseData, GroupData, Id, ApiData, UserData } from "#common/@types/models";

const BASE_URL = `http://localhost:8080/api`;

type OneOrArray<T> = T | T[]
type FetchOptions<T> = ({ body?: T, token?: string } & Partial<Id>) | undefined;
type FetchRes<T extends OneOrArray<ApiData>> = Promise<ResponseData<T>>
const _fetch = async <TRes extends OneOrArray<ApiData>, TOpts extends FetchOptions<TRes>> (route: ApiRts, method: Method, options?: TOpts ) =>
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
    .then(res => res.json())
    .then(res => res as ResponseData<TRes>);

type ApiRouteType<T extends OneOrArray<ApiData>> 
    = T extends OneOrArray<UserData  >  ? ApiRts.Users  
    : T extends OneOrArray<CourseData>  ? ApiRts.Courses
    : T extends OneOrArray<GroupData >  ? ApiRts.Groups 
    : never;

type ApiArgs<T extends OneOrArray<ApiData>, F extends FetchOptions<T>> 
    = ApiRouteType<T> extends never
    ? never
    : F extends undefined ? [ ApiRouteType<T> ] : [ ApiRouteType<T>, F ];

type ApiFuncs = {
    get:    <TRes extends ApiData>  (args: ApiArgs<TRes, Id>)              => FetchRes<TRes>
    getAll: <TRes extends ApiData[]>(args: ApiArgs<TRes, undefined>)       => FetchRes<TRes>
    post:   <TRes extends ApiData>  (args: ApiArgs<TRes, Body<TRes>>)      => FetchRes<TRes>
    put:    <TRes extends ApiData>  (args: ApiArgs<TRes, Body<TRes> & Id>) => FetchRes<TRes>
    delete: <TRes extends ApiData>  (args: ApiArgs<TRes, Id>)              => FetchRes<TRes>
}

const API = Object.freeze({
    get:    <T extends ApiData>(args: ApiArgs<T, Id>) : FetchRes<T> => 
                _fetch<T, Id>(args[0], Method.GET, args[1]),
    
    getAll: <T extends ApiData>(args: ApiArgs<T, undefined>) : FetchRes<T[]> =>
                _fetch<T[], never>(args[0], Method.GET, undefined),
    
    post:   <T extends ApiData>(args: ApiArgs<T, Body<T>>) : FetchRes<T> => 
                _fetch<T, Body<T>>(args[0], Method.POST, args[1]),

    put:    <T extends ApiData>(args: ApiArgs<T, Body<T> & Id>) : FetchRes<T> =>
                _fetch<T, Body<T> & Id>(args[0], Method.PUT, args[1]),

    delete: <T extends ApiData>(args: ApiArgs<T, Id>) : FetchRes<T> =>
                _fetch<T, Id>(args[0], Method.DELETE, args[1]),
}) as ApiFuncs;

export { API };