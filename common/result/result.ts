type Defined<T> = T extends null | undefined ? never : T;

type Result<T, E = Error> = { ok: true , value: Defined<T> }
                              | { ok: false, error: Defined<E> }

type Ok<T>  = Result<T, never>;
const Ok    = <T>(value: Defined<T>): Ok<T> => ({ ok: true , value });

type Err<E> = Result<never, E>;
const Err   = <E>(error: Defined<E>): Err<E> => ({ ok: false, error });

export {
    Defined,
    Result,
    Ok,
    Err
};