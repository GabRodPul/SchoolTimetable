import { 
    Sequelize, 
    DataTypes, 
    Model,
    ModelValidateOptions
} from "sequelize";
import { Id, WarningData } from "../../../common/@types/models";
import { defineId, fkId } from "../utils/data";
import { TxStatus } from "#common/@enums/ws"; 
import { isBeforeStart } from "../utils/validation"; // Assurez-vous que cette fonction est correctement définie

// The only purpose of extending Model is getting
// warnings when types are modified, as to keep our
// models updated.
// & Id is required to pass id to where.
// Omit = avoid having to define "courseId"
interface WarningInstance extends Model<WarningData & Id>, WarningData {}


// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const WarningModel = {
    init: (sequelize: Sequelize) =>
        sequelize.define<WarningInstance>("warnings", {
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
                type: DataTypes.ENUM(...Object.values(TxStatus)), // Utiliser les valeurs de l'enum
                allowNull: false,
                defaultValue: TxStatus.Pending,
                validate: {
                    isIn: {
                        args: [Object.values(TxStatus)],
                        msg: "Le statut doit être 'Pending', 'Approved' ou 'Denied'.",
                    },
                },
                get() {
                    const rawValue = this.getDataValue("status");
                    // Mappez les valeurs de la base de données vers TxStatus
                    switch (rawValue) {
                        case TxStatus.Pending:
                            return TxStatus.Pending;
                        case TxStatus.Approved:
                            return TxStatus.Approved;
                        case TxStatus.Denied:
                            return TxStatus.Denied;
                        default:
                            return rawValue;
                    }
                },
                set(value: TxStatus) {
                    // Mappez les valeurs de TxStatus vers celles de Sequelize
                    switch (value) {
                        case TxStatus.Pending:
                            this.setDataValue("status", TxStatus.Pending);
                            break;
                        case TxStatus.Approved:
                            this.setDataValue("status", TxStatus.Approved);
                            break;
                        case TxStatus.Denied:
                            this.setDataValue("status", TxStatus.Denied);
                            break;
                    }
                },
            },
            
        }, {
            timestamps: true, // Ajoute automatiquement createdAt et updatedAt
            tableName: "warnings",
        }),
};

export { WarningModel };
