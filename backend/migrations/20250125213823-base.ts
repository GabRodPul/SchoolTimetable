'use strict';
import { UserRole } from '#common/@enums/models';
import { ClassHourTable } from '#src/models/table/classHour.table';
import { EnrollmentTable } from '#src/models/table/enrollment.table';
import { GroupTable } from '#src/models/table/group.table';
import { IGTModuleTable } from '#src/models/table/igt-module.table';
import { ModuleTable } from '#src/models/table/module.table';
import { SessionChangedTable } from '#src/models/table/session-changed.table';
import { SessionTable } from '#src/models/table/session.table';
import { UserTable } from '#src/models/table/user.table';
import { WarningTable } from '#src/models/table/warning.table';
import { defineId, enumStrVals } from '#src/utils/data';
import { QueryInterface, DataTypes } from 'sequelize';
import { Migration } from "sequelize-cli-ts-js";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    [ 
      UserTable,
      GroupTable,
      ModuleTable,
      IGTModuleTable,
      EnrollmentTable,
      WarningTable,
      ClassHourTable,
      SessionTable,
      SessionChangedTable,
    ].forEach(async t => await queryInterface.createTable(t.name, t.cols));
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropAllTables({ 
      skip: ["__META_MIGRATIONS", "__META_SEEDERS"]
    });
  }
};
