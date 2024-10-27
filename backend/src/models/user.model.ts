import { Sequelize, DataType, DataTypes, Model } from "sequelize";
import { UserData } from "../../../common/@types/data"

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
interface UserInstance extends Model<UserData> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const UserModel = { init: (sequelize: Sequelize) =>
    sequelize.define<UserInstance>("users", {
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
        }
    })};

export { UserModel };