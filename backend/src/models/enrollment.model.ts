import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, EnrollmentData } from "../../../common/@types/models"
import { defineId, namedFkId } from "../utils/data";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface EnrollmentInstance extends 
    Model<Omit<EnrollmentData, "studentId" | "moduleId">> {}

const EnrollmentModel = { init: (sequelize: Sequelize) =>
    sequelize.define<EnrollmentInstance>("enrollments", {
        ...defineId,

        ...namedFkId("classHourId"),
        ...namedFkId("sessionId"),
    })};

export { EnrollmentModel };