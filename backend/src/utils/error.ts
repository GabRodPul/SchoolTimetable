import { UniqueConstraintError, ValidationError } from "sequelize"
import { ResponseData } from "../../../common/@types/http"
import { resMsg, resVErrs } from "./response"

const computeError = (err: Error, placeholder?: string): ResponseData => 
    err instanceof ValidationError || err instanceof UniqueConstraintError
    ? resVErrs(err.errors.map(e => e.message))
    : resMsg(500, err.message ?? placeholder)

export { computeError };