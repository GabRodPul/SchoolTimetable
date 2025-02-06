'use strict';
import { UserRole } from '#common/@enums/models';
import { defineId, enumStrVals } from '#src/utils/data';
import { QueryInterface, DataTypes } from 'sequelize';
import { Migration } from "sequelize-cli-ts-js";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('users', {
            ...defineId,
            name:   { type: DataTypes.STRING(255) },
            email:  {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: { isEmail: true },
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: { len: [8, 255] },
            },
            phoneNumber: {
                type: DataTypes.STRING(15),
                allowNull: false,
                validate: { is:  /^\+(?:[0-9] ?){6,14}[0-9]$/ }
            },
            role: {
                type: DataTypes.ENUM(enumStrVals(UserRole)),
                allowNull: false
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        });
     
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('users'); 
  }
};
