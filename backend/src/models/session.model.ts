import { Sequelize } from "sequelize";
import { SessionTable } from "./table/session.table";
import { SessionInstance } from "./table/session.table";

// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
const SessionModel = { init: (sequelize: Sequelize) =>
    // Missing foreign keys will be created through relationships
    sequelize.define<SessionInstance>(SessionTable.name, SessionTable.cols as any, { timestamps: true }),
};

export { SessionModel };