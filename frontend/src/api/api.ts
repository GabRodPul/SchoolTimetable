import { ApiRts, Method } from "#common/@enums/http/index"
import { ResponseData, Body } from "#common/@types/http/index";
import { Id } from "#common/@types/models";
import { 
    ApiFuncs, 
    FetchRes, 
    FetchOptions, 
} from "../types/api"

const BASE_URL = `http://localhost:8080/api`;

const logRes = (res: Response) => { console.log(res); return res; }
const logRet = <T>(obj: T) => { console.log(obj); return obj; }

const myfetch = async <TR, TB, TOpts extends FetchOptions<TB>> (route: ApiRts, method: Method, options?: TOpts ) =>
    fetch(logRet(`${BASE_URL}/${route}${ options?.id !== undefined ? "/"+options?.id : "" }`), {
        method,
        mode: "cors",
        body: JSON.stringify(options?.body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": options?.token
        } as HeadersInit
    })
    .then(res => logRes(res))
    .then(res => res.json())
    .then(res => res as ResponseData<TR>);

    export type NotArray = (object | string | bigint | number | boolean) & { length?: never; };
const API = Object.freeze({
    get:    <T>(rt: ApiRts, opts: Id) : FetchRes<T> => 
                myfetch<T, never, Id>(rt, Method.GET, opts),
    
    getAll: <T extends NotArray>(rt: ApiRts) : FetchRes<T[]> =>
                myfetch<T[], never, never>(rt, Method.GET, undefined),
    
    post:   <T>(rt: ApiRts, opts: Body<T>) : FetchRes<T> => 
                myfetch<T, T, Body<T>>(rt, Method.POST, opts),

    put:    <T>(rt: ApiRts, opts: Body<T> & Id) : FetchRes<T> =>
                myfetch<T, T, Body<T> & Id>(rt, Method.PUT, opts),

    delete: <T>(rt: ApiRts, opts: Id) : FetchRes<T> =>
                myfetch<T, never, Id>(rt, Method.DELETE, opts),
}) as ApiFuncs;

export { API, myfetch };