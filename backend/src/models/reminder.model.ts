import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, ReminderData } from "../../../common/@types/models"
import { defineId } from "../utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface ReminderInstance extends Model<
    Omit<ReminderData, 
    "changeId"  |
    "groupId"
    > & Id> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const ReminderModel = { init: (sequelize: Sequelize) =>
    sequelize.define<ReminderInstance>("reminders", {
        ...defineId,
        startDate:  {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isRangeCorrect(value: Date) {
                    if (value <= (this.startDate as Date))
                        throw new Error("endDate must be greater than startDate")
                }
            }
        }
        // courseCode: reference(DataTypes.STRING(5), "courses", "code"),
    })};

export { ReminderModel };