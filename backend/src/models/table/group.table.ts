import { GroupData, Id } from "#common/@types/models";
import { defineId } from "#src/utils/data";
import { DataTypes, Model } from "sequelize";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
export interface GroupInstance extends Model<GroupData & Id> {}

export const GroupTable = {
    name: "groups",
    cols: {
        ...defineId,
        name:  {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: { len:[5,5] as [number, number] },
        },
    }
};