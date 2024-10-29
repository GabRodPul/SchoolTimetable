import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, CourseData } from "../../../common/@types/models"
import { defineId } from "../utils/id";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
interface CourseInstance extends Model<CourseData & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const CourseModel = { init: (sequelize: Sequelize) =>
    sequelize.define<CourseInstance>("courses", {
        ...defineId,
        code:   { 
            type: DataTypes.STRING(3),
            validate: {
                len: [3, 3],
                isAlpha: true
            }
        },

    })};

export { CourseModel };