import { ResponseData } from "#common/@types/http";
import { createContext, useReducer, useContext } from "react";
import { FetchState, FetchData, evalFetch } from "./api-context-def";
import { Id } from "#common/@types/models";

enum FetchState { NotStarted, Loading, Success, Error, }
type FetchData<T>
    = { state: FetchState.NotStarted                                    }
    | { state: FetchState.Loading                                       }
    | { state: FetchState.Success,  payload: { data:  ResponseData<T> } }
    | { state: FetchState.Error,    payload: { error: Error           } }

const evalFetch = <T,>(state, data: FetchData<T>) => {

}

const ApiCtx = createContext<FetchData>({ state: FetchState.NotStarted });

const ApiResourceProvider = <T,>(props) => {
    const [apiResource, dispatchApiResource] = useReducer(
        evalFetch, {
            state: FetchState.NotStarted
        }
    );

    return (
        <ApiCtx.Provider
            value={[apiResource, dispatchApiResource]}
            {...props}
        />
    )
}

const useApiResource = () => {
    const ctx = useContext(ApiCtx);
    if (!ctx)
        throw new Error(`useApiResource must be within an ApiResourceProvider`)
    
    const [ctxState, ctxDispatch] = ctx;
    const get = (id: Id) => {
        try {
            
        } catch (error: any) {
            ctxDispatch({
                state: FetchState.Error,
                payload: { error } 
            })
        }
    }
}