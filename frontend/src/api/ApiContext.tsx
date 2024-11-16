import { Body } from "#common/@types/http";
import { createContext, useReducer, useContext, Reducer, PropsWithoutRef } from "react";
import { Id, UserData } from "#common/@types/models";
import { API } from "./api";
import { FetchData, FetchState } from "../types/api";
import { ApiRts } from "#common/@enums/http";

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

const useApi = <T,>(route: ApiRts)
: [ FetchData<T>, { get: (id: Id) => Promise<void> } ] => {
    const [fetchRsrc, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(
        evalFetch<T>(), 
        { state: FetchState.NotStarted }
    );

    const ctx = useContext(createApiCtx<T>());
    if (!ctx)
        throw new Error(`useApiResource must be within an ApiResourceProvider`);

    return [fetchRsrc, {
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
        // @ts-expect-error
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
                const data = await API.post<T extends UserData ? T & { access_token: string } : T, T>(route, { body });
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

        put: async (opts: Body<T> & Id) => {
            try {
                const data = await API.put<T, T>(route, { ...opts });
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
        
        delete: async (id: Id) => {
            try {
                const data = await API.delete<T>(route, id);
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
    }]
}

export { ApiResourceProvider, useApi };