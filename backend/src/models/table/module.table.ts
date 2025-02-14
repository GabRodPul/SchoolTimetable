import { DataTypes, Model, Sequelize } from "sequelize";
import { Id, ModuleData } from "#common/@types/models";
import { defineId } from "#src/utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define ids
export interface ModuleInstance extends 
    Model<Omit<ModuleData, "groupId"> & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
export const ModuleTable = {
    name: "modules",
    cols: {
        ...defineId,
        name:  {
            type:       DataTypes.STRING(3),
            allowNull:  false,
            validate: { 
                len:[3,3] as [number, number],
            },
        },
    }
};