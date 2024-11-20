import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Id, UserData } from "../../../common/@types/models";
import { defineId } from "../utils/data";
import { UserRole } from "../../../common/@enums/models" 

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
interface UserInstance extends Model<UserData & Id> {}

const roleVals = { values: Object.values(UserRole) } as const;

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const UserModel = { init: (sequelize: Sequelize) =>
    sequelize.define<UserInstance>("users", {
        ...defineId,
        name:   { type: DataTypes.STRING(255) },
        email:  {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { len: [8, 255] },
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: { is:  /^\+(?:[0-9] ?){6,14}[0-9]$/ }
        },
        role: {
            type: DataTypes.ENUM(roleVals),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    })};

export { UserModel };