'use strict';
// OG filename: 20250125213823-base.ts
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
import { defineId, enumStrVals, referenceId } from '#src/utils/data';
import sequelize from 'sequelize';
import { QueryInterface, DataTypes, Sequelize as Seq } from 'sequelize';
import { Migration } from "sequelize-cli-ts-js";
import { initDb } from '#src/models';
import init from 'connect-session-sequelize';
import { fstat, write, writeFileSync } from 'fs';

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
    
    const db = initDb(queryInterface.sequelize);
    
    // const models = [
    //   db.users,
    //   db.groups,
    //   db.modules,
    //   db.igt_modules,
    //   db.enrollments,
    //   db.warnings,
    //   db.classHour,
    //   db.sessions,
    //   db.sessionsChanged
    // ].map(m => {
    //   console.log(`m:attrs:${m.name}:`);
    //   console.log(m.rawAttributes);
    // });

    // await db.sequelize.sync({ force: true, alter: true });
    // await queryInterface.dropTable(EnrollmentTable.name);
    // console.log(EnrollmentTable.cols);
    // await queryInterface.createTable(EnrollmentTable.name, {
      // ...EnrollmentTable.cols,
      // studentId: referenceId(UserTable.name, "studentId"),
    // });

    await db.sequelize.query("CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER auto_increment , `name` VARCHAR(255), `email` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `phoneNumber` VARCHAR(15) NOT NULL, `role` ENUM('UR0_STUDENT', 'UR1_TEACHER', 'UR2_HEAD', 'UR3_ADMIN') NOT NULL, `image` VARCHAR(255), `createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW(), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await db.sequelize.query("CREATE TABLE IF NOT EXISTS `groups` (`id` INTEGER auto_increment , `name` VARCHAR(5) NOT NULL, `createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW(), PRIMARY KEY (`id`)) ENGINE=InnoDB")
    await db.sequelize.query("CREATE TABLE IF NOT EXISTS `modules` (`id` INTEGER auto_increment , `name` VARCHAR(3) NOT NULL, `createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW(), PRIMARY KEY (`id`)) ENGINE=InnoDB")
    
    await db.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `igt_modules` ( "             +
        "`id` INTEGER auto_increment ,"                         + 
        "`teacherId` INTEGER NOT NULL,"                         +
        "`groupId` INTEGER NOT NULL,"                           +
        "`moduleId` INTEGER NOT NULL,"                          +
        "`weeklyHours` INTEGER NOT NULL,"                       +
        "`createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW()," +
        "PRIMARY KEY (`id`), "                                  +
        "FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,"  +
        "FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,"   +
        "FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE"                     +
      ") ENGINE=InnoDB"
    );

    await db.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `enrollments` (             "+
      "  `id` INTEGER auto_increment ,                        "+
      "  `studentId` INTEGER NOT NULL,                        "+
      "  `moduleId` INTEGER NOT NULL,                         "+
      "`createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW()," +
      "  PRIMARY KEY (`id`),                                  "+
      "  FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, "+
      "  FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE" +
      ") ENGINE=InnoDB"
    );

    await db.sequelize.query("CREATE TABLE IF NOT EXISTS `warnings` (`id` INTEGER auto_increment , `teacherId` INTEGER NOT NULL, `description` VARCHAR(255) NOT NULL, `startDate` VARCHAR(255) NOT NULL, `endDate` VARCHAR(255) NOT NULL, `startHour` TIME NOT NULL, `endHour` TIME NOT NULL, `createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW(), PRIMARY KEY (`id`), FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB");
    await db.sequelize.query("CREATE TABLE IF NOT EXISTS `classHours` (`id` INTEGER auto_increment , `turn` ENUM('MORNING', 'AFTERNOON', 'EVENING') NOT NULL, `sessionHour` INTEGER NOT NULL, `start` TIME NOT NULL, `end` TIME NOT NULL, `createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW(), PRIMARY KEY (`id`)) ENGINE=InnoDB");

    await db.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `sessions` (" +
        "`id` INTEGER auto_increment , " +
        "`classHourId` INTEGER, "  +
        "`igtModuleId` INTEGER, " +
        "`day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY') NOT NULL," + 
        "`createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW()," +
        "PRIMARY KEY (`id`), " +
        "FOREIGN KEY (`classHourId`) REFERENCES `classHours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE," + 
        "FOREIGN KEY (`igtModuleId`) REFERENCES `igt_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB"
    );

    await db.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `session_changed` (                                 " +
      "  `id` INTEGER auto_increment ,                                                 " +
      "  `classHourId` INTEGER NOT NULL,                                               " +
      "  `sessionId` INTEGER NOT NULL,                                                 " +
      "  `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY') NOT NULL,  " +
      "  `startDate` DATETIME NOT NULL, `endDate` DATETIME NOT NULL,                   " +
      "`createdAt` DATE DEFAULT NOW(), `updatedAt` DATE DEFAULT NOW()," +
      "  PRIMARY KEY (`id`),                                                           " +
      "  FOREIGN KEY (`classHourId`) REFERENCES `classHours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,                   " +
      "  FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`id`) " +
      "ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB                              " 
    );
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropAllTables({ 
      skip: ["__META_MIGRATIONS", "__META_SEEDERS"]
    });
  }
};
