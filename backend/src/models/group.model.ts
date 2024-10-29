import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, GroupData } from "../../../common/@types/models"
import { defineId } from "../utils/id";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
interface UserInstance extends Model<GroupData & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const GroupModel = { init: (sequelize: Sequelize) =>
    sequelize.define<UserInstance>("users", {
        ...defineId,
        code:  {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { isEmail: true },
        },
    })};

export { GroupModel };