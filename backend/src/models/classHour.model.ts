import { Sequelize } from "sequelize";
import { ClassHourTable, ClassHourInstance } from "./table/classHour.table";

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const ClassHourModel = { init: (sequelize: Sequelize) =>
    sequelize.define<ClassHourInstance>(ClassHourTable.name, ClassHourTable.cols, { timestamps: true })};;

export { ClassHourModel };