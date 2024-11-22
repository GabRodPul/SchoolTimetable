import { 
    Sequelize, 
    DataTypes, 
    Model,
} from "sequelize";
import { Id, ClassHourData } from "../../../common/@types/models"
import { defineId, enumStrVals } from "../utils/data";
import { Turn } from "../../../common/@enums/models";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface ClassHourInstance extends Model<ClassHourData & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const ClassHourModel = { init: (sequelize: Sequelize) =>
    sequelize.define<ClassHourInstance>("warnings", {
        ...defineId,
        turn: {
            type: DataTypes.ENUM(enumStrVals(Turn)),
            allowNull: false,
        },
        sessionHour: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 6
            }
        },
        start:  {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end: {
            type: DataTypes.TIME,
            allowNull: false,
            // We need to add validation for this to make sure startDate <= endDate...
            // - Gabriel
        },
    })};

export { ClassHourModel };