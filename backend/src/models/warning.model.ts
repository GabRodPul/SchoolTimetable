import { 
    Sequelize, 
    DataTypes, 
    Model,
    ModelValidateOptions
} from "sequelize";
import { Id, WarningData } from "../../../common/@types/models";
import { defineId, fkId } from "../utils/data";
import { TxStatus } from "#common/@enums/ws"; 
import { isBeforeStart } from "../utils/validation"; // Assurez-vous que cette fonction est correctement définie
import { WarningTable } from "./table/warning.table";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface WarningInstance extends Model<WarningData & Id>, WarningData {}

const WarningModel = { init: (sequelize: Sequelize) =>
    sequelize.define<WarningInstance>(WarningTable.name, WarningTable.cols, { timestamps: true })};;

export { WarningModel };
