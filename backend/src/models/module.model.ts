import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, ModuleData } from "../../../common/@types/models"
import { defineId } from "../utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define ids
interface ModuleInstance extends Model<
    Omit<ModuleData,
    "groupId"   | 
    "teacherId" | 
    "courseId" 
    > & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const ModuleModel = { init: (sequelize: Sequelize) =>
    sequelize.define<ModuleInstance>("modules", {
        ...defineId,
        subjectCode:  {
            type: DataTypes.STRING(3),
            allowNull: false,
            validate: { len:[3,3] },
        },
        // courseCode: reference(DataTypes.STRING(5), "courses", "code"),
    })};

export { ModuleModel };