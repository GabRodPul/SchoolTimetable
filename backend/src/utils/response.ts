import { ResponseData } from "../../../common/@types/http"

const resMsg    = (code: number, message: string): ResponseData<never> => ({ code, message })
const resVErrs  = ( errors: string[] ):            ResponseData<never> => ({ code: 400, errors })

export { resMsg, resVErrs };