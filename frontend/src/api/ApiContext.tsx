import { ResponseData } from "#common/@types/http";
import { createContext, useReducer, useContext, Reducer } from "react";
import { ApiData, Id } from "#common/@types/models";
import { API } from "./api";
import { ApiRouteType } from "src/@types/api";

enum FetchState { NotStarted, Loading, Success, Error, }

type FetchData<T extends ApiData>
    = { state: FetchState.NotStarted                            }
    | { state: FetchState.Loading,                              }
    | { state: FetchState.Success,      data: ResponseData<T>   }
    | { state: FetchState.Error,        error: Error            }

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

const ApiResourceProvider = <T extends ApiData>(props) => {
    const [apiResource, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(evalFetch<T>(), { state: FetchState.NotStarted });

    return (
        <ApiCtx.Provider
            value={[apiResource, dispatch]}
            {...props}
        />
    )
}

const useApi = <T extends ApiData>(route: ApiRouteType<T>) => {
    const [apiResource, dispatch] = useReducer<Reducer<FetchData<T>, FetchData<T>>>(evalFetch<T>(), { state: FetchState.NotStarted });
    // const ctx = useContext(ApiCtx);
    // if (!ctx)
        // throw new Error(`useApiResource must be within an ApiResourceProvider`)
    
    const get = async (id: Id) => {
        try {
            return await API.get<T>(route, id);
        } catch (e: unknown) {
            dispatch({
                state: FetchState.Error,
                error: e as Error
            })
        }
    }
}

export { ApiResourceProvider, useApi };