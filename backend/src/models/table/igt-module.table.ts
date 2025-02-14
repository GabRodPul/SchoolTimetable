import { Id, IGTModuleData } from "#common/@types/models";
import { defineId, fkId } from "#src/utils/data";
import { Sequelize, DataTypes, Model } from "sequelize";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define ids
export interface IGTModuleInstance extends Model<IGTModuleData & Id> {}

export const IGTModuleTable = {
    name: "igt_modules",
    cols: {
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
    }
};