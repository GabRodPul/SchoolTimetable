import { WorkDay } from "#common/@enums/models";

export const translate = {
    workDay : (day: WorkDay) => ({
        "MONDAY"    :   "Lunes",
        "TUESDAY"   :   "Martes",
        "WEDNESDAY" :   "Miércoles",
        "THURSDAY"  :   "Jueves",
        "FRIDAY"    :   "Viernes",
    }[day]),
};
