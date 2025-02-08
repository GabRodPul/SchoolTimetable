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
import sequelize from 'sequelize';
import { QueryInterface, DataTypes, Sequelize as Seq } from 'sequelize';
import { Migration } from "sequelize-cli-ts-js";
import { DB } from '#src/models';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    // const timestamps = {
    //   createdAt: {
    //       type: DataTypes.DATE(),
    //       defaultValue: Seq.literal("CURRENT_TIMESTAMP"),
    //       allowNull: false,
    //   }, 
    //   updatedAt: {
    //       type: DataTypes.DATE(),
    //       defaultValue: Seq.literal("CURRENT_TIMESTAMP"),
    //       allowNull: false,
    //   }, 
    // };
    
    // [ 
    //   { name: UserTable.name          , cols: { ...timestamps, ...UserTable.cols            }},
    //   { name: GroupTable.name         , cols: { ...timestamps, ...GroupTable.cols           }},
    //   { name: ModuleTable.name        , cols: { ...timestamps, ...ModuleTable.cols          }},
    //   { name: IGTModuleTable.name     , cols: { ...timestamps, ...IGTModuleTable.cols       }},
    //   { name: EnrollmentTable.name    , cols: { ...timestamps, ...EnrollmentTable.cols      }},
    //   { name: WarningTable.name       , cols: { ...timestamps, ...WarningTable.cols         }},
    //   { name: ClassHourTable.name     , cols: { ...timestamps, ...ClassHourTable.cols       }},
    //   { name: SessionTable.name       , cols: { ...timestamps, ...SessionTable.cols         }},
    //   { name: SessionChangedTable.name, cols: { ...timestamps, ...SessionChangedTable.cols  }},
    // ].forEach(async t => await queryInterface.createTable(t.name, t.cols as any));
    Object
      .entries(DB).filter(([k, _]) => ["sequelize", "store"].includes(k))
      .forEach(async ([name, model]) => await queryInterface.createDatabase(name, model));
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropAllTables({ 
      skip: ["__META_MIGRATIONS", "__META_SEEDERS"]
    });
  }
};
