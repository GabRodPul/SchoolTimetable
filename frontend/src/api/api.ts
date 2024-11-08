import { ApiRts, Method } from "#common/@enums/http/index"
import { ResponseData, Body } from "#common/@types/http/index";
import { Id, ApiData } from "#common/@types/models";
import { 
    OneOrArray, 
    ApiFuncs, 
    FetchRes, 
    FetchOptions, 
    ApiRouteType
} from "../@types/api"

const BASE_URL = `http://localhost:8080/api`;

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

const API = Object.freeze({
    get:    <T extends ApiData>(rt: ApiRouteType<T>, opts: Id) : FetchRes<T> => 
                _fetch<T, Id>(rt, Method.GET, opts),
    
    getAll: <T extends ApiData>(rt: ApiRouteType<T>) : FetchRes<T[]> =>
                _fetch<T[], never>(rt, Method.GET, undefined),
    
    post:   <T extends ApiData>(rt: ApiRouteType<T>, opts: Body<T>) : FetchRes<T> => 
                _fetch<T, Body<T>>(rt, Method.POST, opts),

    put:    <T extends ApiData>(rt: ApiRouteType<T>, opts: Body<T> & Id) : FetchRes<T> =>
                _fetch<T, Body<T> & Id>(rt, Method.PUT, opts),

    delete: <T extends ApiData>(rt: ApiRouteType<T>, opts: Id) : FetchRes<T> =>
                _fetch<T, Id>(rt, Method.DELETE, opts),
}) as ApiFuncs;

export { API };