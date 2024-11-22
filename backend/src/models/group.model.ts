import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, GroupData } from "../../../common/@types/models"
import { defineId } from "../utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface GroupInstance extends Model<Omit<GroupData, "courseId"> & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const GroupModel = { init: (sequelize: Sequelize) =>
    sequelize.define<GroupInstance>("groups", {
        ...defineId,
        code:  {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: { len:[5,5] },
        },
        // courseCode: reference(DataTypes.STRING(5), "courses", "code"),
    })};

export { GroupModel };