import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, IGTModuleData, ModuleData } from "../../../common/@types/models"
import { defineId, fkId } from "../utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define ids
interface IGTModuleInstance extends Model<IGTModuleData & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const IGTModuleModel = { init: (sequelize: Sequelize) =>
    sequelize.define<IGTModuleInstance>("igt_modules", {
        ...defineId,

        // We still need to define this because of the 'indexes' field.
        teacherId:  fkId,
        groupId:    fkId,
        moduleId:   fkId,

        weeklyHours: {
            type:       DataTypes.INTEGER,
            allowNull:  false,
            // We should probably add some more validation to this 
            // - Gabriel
            validate: { 
                min: 1 
            }
        }
    }, 
    // {
    //     indexes: [{
    //         unique: true,
    //         fields: [ "groupId", "moduleId" ]
    //     }]
    // }
)};

export { IGTModuleModel };