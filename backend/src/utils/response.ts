import { ResponseData } from "../../../common/@types/http"

const resMsg    = (code: number, message: string): ResponseData => ({ code, message })
const resVErrs  = ( errors: string[] ):            ResponseData => ({ code: 400, errors })

export { resMsg, resVErrs };