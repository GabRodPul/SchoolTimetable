import { Sequelize } from "sequelize";
import { SessionChangedTable, SessionChangedInstance } from "./table/session-changed.table";

// https://sequelize.org/docsSessionDatav6/core-concepts/validations-and-constraints/
const SessionChangedModel = { init: (sequelize: Sequelize) =>
        sequelize.define<SessionChangedInstance>(SessionChangedTable.name, SessionChangedTable.cols)};

export { SessionChangedModel };