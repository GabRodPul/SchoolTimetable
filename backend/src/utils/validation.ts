import { ModelValidateOptions } from "sequelize";

export const isBeforeStart = <T extends Date | string>(_this: ModelValidateOptions, value: T) => {
    if (value <= (_this.startDate as Date))
        throw new Error("endDate must be greater than startDate")
}

