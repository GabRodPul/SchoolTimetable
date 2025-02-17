import { EnrollmentData, Id } from "#common/@types/models";
import { defineId, fkId } from "#src/utils/data";
import { Model } from "sequelize";

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
export interface EnrollmentInstance extends 
    Model<EnrollmentData & Id> {}

export const EnrollmentTable = {
    name: "enrollments",
    cols: {
        ...defineId,
        studentId:  fkId,
        moduleId:   fkId,
    }
};