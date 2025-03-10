import { Body, ResponseData } from "#common/@types/http";
import { createContext, useReducer, useContext, Reducer, PropsWithoutRef } from "react";
import { AuthData, Id, UserData } from "#common/@types/models";
import { API, myfetch } from "./api";
import { FetchData, FetchOptions, FetchState } from "../types/api";
import { ApiRts, Method } from "#common/@enums/http";

const evalFetch = <T,>() => (fetch: FetchData<T>, payload: FetchData<T>) => {
    switch (payload.state) {
        case FetchState.NotStarted: return {
            ...fetch,
            state: payload.state
        };

        case FetchState.Loading: return {
            ...fetch,
            state: payload.state
        };

        case FetchState.Success:
        case FetchState.SuccessMany:
        case FetchState.Error:
            return { ...payload };
    }
}

// const ApiCtx = createContext<FetchData<ApiData>>({ state: FetchState.NotStarted });
const createApiCtx = <T,>() => createContext<FetchData<T>>({ state: FetchState.NotStarted });

const ApiResourceProvider = <T,>(props: any) => {
    const [fetchRsrc, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(evalFetch<T>(), { state: FetchState.NotStarted });
    const ApiCtx = createApiCtx<T>();
    return (
        <ApiCtx.Provider
            value={[fetchRsrc, dispatch]}
            {...props}
        />
    )
}

type UserLogin = { email: string, password: string };

const useApi = <T,>(route: ApiRts)
    : [FetchData<T>, {
        fetch: (_route: string, method: Method, init?: any)
            => Promise<void>,
        get: (id: Id) => Promise<void>,
        getAll: () => Promise<void>,
        post: (body: T) => Promise<void>,
        put: (opts: Body<T> & Id) => Promise<void>,
        delete: (id: Id) => Promise<void>,
        signin:
        ((body: UserData) => Promise<void>) |
        undefined,
        login:
        ((body: UserLogin) => Promise<void>) |
        undefined
        resetRsrc: () => void
    }] => {

    const [fetchRsrc, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(
        evalFetch<T>(),
        { state: FetchState.NotStarted }
    );

    const ctx = useContext(createApiCtx<T>());
    if (!ctx)
        throw new Error(`useApiResource must be within an ApiResourceProvider`);


    let signin, login;
    switch (route) {
        case ApiRts.Signin: {
            signin = async (body: UserData) => {
                try {
                    const data = await myfetch<AuthData, UserData, Body<UserData>>(ApiRts.Signin, Method.POST, { body: body })
                    dispatch({
                        state: FetchState.Success,
                        data: data as T // xddd
                    });
                } catch (e: unknown) {
                    dispatch({
                        state: FetchState.Error,
                        error: e as Error
                    })
                }
            }
        } break;

        case ApiRts.Login: {
            login = async (body: UserLogin) => {
                try {
                    const data = await myfetch<AuthData, UserLogin, Body<UserLogin>>(ApiRts.Login, Method.POST, { body: body })
                    dispatch({
                        state: FetchState.Success,
                        data: data as T // xddd
                    });
                } catch (e: unknown) {
                    dispatch({
                        state: FetchState.Error,
                        error: e as Error
                    })
                }
            }
        } break;

        default: {
            // authFunc = undefined;
            // authFunc = async (body: never) => {
            //     dispatch({
            //         state: FetchState.Error,
            //         error: new Error(`authFunc used without ApitRts.Signin or ApiRts.Login`)
            //     })
            // };
        } break;
    }

    return [fetchRsrc, {
        fetch: async (_route: string, method: Method, init?: any) => {
            try {
                const data = await
                    fetch(_route, {
                        method,
                        mode: "cors",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        } as HeadersInit,
                        ...init
                    })
                        .then(res => res.json())
                        .then(res => res as ResponseData<T>);;

                dispatch({
                    state: FetchState.Success,
                    data
                });
            } catch (err: any) {
                dispatch({
                    state: FetchState.Error,
                    error: err as Error
                });
            }
        },
        // fetchMany: async (_route: string, init?: any) => {
        //     try {
        //         const data = await
        //             fetch(_route, init)
        //                 .then(res => res.json())
        //                 .then(res => res as ResponseData<T[]>);;

        //         dispatch({
        //             state: FetchState.SuccessMany,
        //             data
        //         });
        //     } catch (err: any) {
        //         dispatch({
        //             state: FetchState.Error,
        //             error: err as Error
        //         });
        //     }
        // },

        get: async (id: Id) => {
            try {
                const data = await API.get<T>(route, id);
                dispatch({
                    state: FetchState.Success,
                    data
                });
            } catch (e: unknown) {
                dispatch({
                    state: FetchState.Error,
                    error: e as Error
                })
            }
        },

        // ts(2353): Object literal may only specify known properties, and 'getAll' does 
        //           not exist in type '{ get: (id: Id) => Promise<void>; }'
        // Apparently this is a bug???

        getAll: async () => {
            try {
                const data = await API.getAll<T>(route);
                dispatch({
                    state: FetchState.SuccessMany,
                    data
                });
            } catch (e: unknown) {
                dispatch({
                    state: FetchState.Error,
                    error: e as Error
                })
            }
        },

        post: async (body: T) => {
            try {
                // const data = await API.post<T extends UserData ? AuthData : T, T>(route, { body });
                const data = await API.post<T, T>(route, { body }); // We are using "signin" to get the access token so screw this.
                dispatch({
                    state: FetchState.Success,
                    data
                });
            } catch (e: unknown) {
                console.error("Error en api.post:", e);
                dispatch({
                    state: FetchState.Error,
                    error: e as Error
                });
            }
        },

        put: async (opts: Body<T> & Id) => {
            try {
                const data = await API.put<T, T>(route, { ...opts });
                dispatch({
                    state: FetchState.Success,
                    data
                });
                console.log("llegó aquí 3")
            } catch (e: unknown) {
                dispatch({
                    state: FetchState.Error,
                    error: e as Error
                })
            }
        },


        delete: async (id: Id) => {
            try {
                console.log("Enviando solicitud para borrar id:", id);
                const data = await API.delete<T>(route, id);
                console.log("Respuesta de la API al borrar:", data);
                dispatch({
                    state: FetchState.Success,
                    data
                });
            } catch (e: unknown) {
                console.error("Error en api.delete:", e);
                dispatch({
                    state: FetchState.Error,
                    error: e as Error
                });
            }
        },




        signin,
        login,

        resetRsrc: () => dispatch({ state: FetchState.NotStarted })
    }];
}

export { ApiResourceProvider, useApi };