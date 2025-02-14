import { DataTypes, Model } from "sequelize";
import { Id, WarningData } from "#common/@types/models";
import { defineId, enumStrVals, fkId } from "#src/utils/data";
import { TxStatus } from "#common/@enums/ws";

export interface WarningInstance extends
    Model<WarningData & Id> { }

const txStatusVals = enumStrVals(TxStatus);

export const WarningTable = {
    name: "warnings",
    cols: {
        ...defineId,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teacherId: {
            ...fkId,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1, // ID du professeur doit être un entier positif
            },
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La description ne peut pas être vide.",
                },
            },
        },
        startDate: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La date de début est requise.",
                },
                isDate: {
                    args: true,
                    msg: "La date de début doit être au format valide (YYYY-MM-DD).",
                },
            },
        },
        endDate: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La date de fin est requise.",
                },
                isDate: {
                    args: true,
                    msg: "La date de fin doit être au format valide (YYYY-MM-DD).",
                },
            },
        },
        startHour: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "L'heure de début est requise.",
                },
            },
        },
        endHour: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "L'heure de fin est requise.",
                },
            },
        },
        status: {
            type: DataTypes.ENUM(txStatusVals), // Utiliser les valeurs de l'enum
            allowNull: false,
            defaultValue: TxStatus.Pending,
            validate: {
                isIn: {
                    args: [txStatusVals.values],
                    msg: "Le statut doit être 'Pending', 'Approved' ou 'Denied'.",
                },
            },
        },
    }
};