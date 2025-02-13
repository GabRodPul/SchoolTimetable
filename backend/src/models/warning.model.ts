import { Sequelize } from "sequelize";
import { WarningTable, WarningInstance } from "./table/warning.table";

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const WarningModel = { init: (sequelize: Sequelize) =>
    sequelize.define<WarningInstance>(WarningTable.name, WarningTable.cols, { timestamps: true })};;

export { WarningModel };