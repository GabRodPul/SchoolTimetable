import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, GroupData } from "../../../common/@types/models"
import { defineId } from "../utils/data";
import { GroupTable, GroupInstance } from "./table/group.table";


// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const GroupModel = { init: (sequelize: Sequelize) =>
    sequelize.define<GroupInstance>(GroupTable.name, GroupTable.cols, { timestamps: true })};

export { GroupModel };