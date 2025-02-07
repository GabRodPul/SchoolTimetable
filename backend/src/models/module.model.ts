import { DataTypes, Sequelize } from "sequelize";
import { ModuleTable, ModuleInstance } from "./table/module.table";

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const ModuleModel = { init: (sequelize: Sequelize) =>
    sequelize.define<ModuleInstance>(ModuleTable.name, ModuleTable.cols)};

export { ModuleModel };