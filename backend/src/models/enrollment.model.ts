import { Sequelize } from "sequelize";
import { EnrollmentInstance, EnrollmentTable } from "./table/enrollment.table";


const EnrollmentModel = { init: (sequelize: Sequelize) =>
    sequelize.define<EnrollmentInstance>(EnrollmentTable.name, EnrollmentTable.cols, { timestamps: true })};;

export { EnrollmentModel };