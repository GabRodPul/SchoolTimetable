import { ResponseData } from "#common/@types/http";
import { createContext, useReducer, useContext, Reducer, PropsWithoutRef } from "react";
import { ApiData, Id } from "#common/@types/models";
import { API } from "./api";
import { ApiRouteType, FetchData, FetchState } from "../types/api";

const evalFetch = <T extends ApiData>() => (fetch: FetchData<T>, payload: FetchData<T>) => {
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
        case FetchState.Error: 
            return { ...payload };
    }
}

const ApiCtx = createContext<FetchData<ApiData>>({ state: FetchState.NotStarted });

const ApiResourceProvider = <T extends ApiData>(props: any) => {
    const [fetchRsrc, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(evalFetch<T>(), { state: FetchState.NotStarted });

    return (
        <ApiCtx.Provider
            value={[fetchRsrc, dispatch]}
            {...props}
        />
    )
}

const useApi = <T extends ApiData>(route: ApiRouteType<T>)
: [ FetchData<T>, { get: (id: Id) => Promise<void> } ] => {
    const [fetchRsrc, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(evalFetch<T>(), { state: FetchState.NotStarted });
    // const ctx = useContext(ApiCtx);
    // if (!ctx)
        // throw new Error(`useApiResource must be within an ApiResourceProvider`)
    
    const get = async (id: Id) => {
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
    };

    return [fetchRsrc, { get }]
}

export { ApiResourceProvider, useApi };