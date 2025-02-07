import { Sequelize } from "sequelize";
import { IGTModuleInstance, IGTModuleTable } from "./table/igt-module.table";


// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const IGTModuleModel = { init: (sequelize: Sequelize) =>
    sequelize.define<IGTModuleInstance>(IGTModuleTable.name, IGTModuleTable.cols)};

export { IGTModuleModel };