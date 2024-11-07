import { ApiRts, Method } from "#common/@enums/http/index"
import { ResponseData, Body } from "#common/@types/http/index";
import { CourseData, GroupData, Id, UserData } from "#common/@types/models";

const BASE_URL = `http://localhost:8080/api`;

type FetchOptions<T> = { body?: T, token?: string } & Partial<Id>;
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

type ApiArgs<T, F extends FetchOptions<T>> 
    = T extends UserData    ? [ ApiRts.Users,    F ]
    : T extends CourseData  ? [ ApiRts.Courses,  F ]
    : T extends GroupData   ? [ ApiRts.Groups,   F ]
    : never;


const API = {
    get:    <T>(args: ApiArgs<T, Id>) : Promise<ResponseData<T>> => 
                _fetch<T, Id>(args[0], Method.GET, args[1]),
    
    getAll: <T>(args: ApiArgs<T, never>) : Promise<ResponseData<T[]>> =>
                _fetch<T[], never>(args[0], Method.GET, args[1]),
    
    post:   <T>(args: ApiArgs<T, Body<T>>) : Promise<ResponseData<T>> => 
                _fetch<T, Body<T>>(args[0], Method.POST, args[1]),

    put:    <T>(args: ApiArgs<T, Body<T> & Id>) : Promise<ResponseData<T>> =>
                _fetch<T, Body<T> & Id>(args[0], Method.PUT, args[1]),

    delete: <T>(args: ApiArgs<T, Id>) : Promise<ResponseData<T>> =>
                _fetch<T, Id>(args[0], Method.DELETE, args[1]),
} as const;

export { API };