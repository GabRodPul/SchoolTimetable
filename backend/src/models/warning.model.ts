import { 
    Sequelize, 
    DataTypes, 
    Model,
    ModelValidateOptions
} from "sequelize";
import { Id, WarningData } from "../../../common/@types/models"
import { defineId, fkId } from "../utils/data";
import { isBeforeStart } from "../utils/validation";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface WarningInstance extends 
    Model<WarningData & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const WarningModel = { init: (sequelize: Sequelize) =>
    sequelize.define<WarningInstance>("warnings", {
        ...defineId,
        teacherId: fkId,
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        startDate:  {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        endDate: {
            type: DataTypes.STRING(255),
            allowNull: false,
            // We need to add validation for this to make sure startDate <= endDate...
            // - Gabriel
        },
        startHour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endHour: {
            type: DataTypes.TIME,
            allowNull: false,
            // Same here: validation
            // - Gabriel
        },
    })};

export { WarningModel };