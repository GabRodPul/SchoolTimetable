import { Sequelize, DataTypes, Model } from "sequelize";
import { Id, TeacherModuleData } from "../../../common/@types/models"
import { defineId } from "../utils/data";

interface TeacherModuleInstance extends 
    Model<Omit<TeacherModuleData, "teacherId" | "moduleId">> {}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const TeacherModuleModel = { init: (sequelize: Sequelize) =>
    sequelize.define<TeacherModuleInstance>("teacher_modules", {})};

export { TeacherModuleModel };