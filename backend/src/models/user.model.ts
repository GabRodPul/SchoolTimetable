import { Sequelize } from "sequelize";
import { UserInstance, UserTable } from "./table/user.table";

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const UserModel = { init: (sequelize: Sequelize) =>
    sequelize.define<UserInstance>(UserTable.name, UserTable.cols, { timestamps: true })};

export { UserModel };