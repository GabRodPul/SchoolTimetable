import { DataTypes } from "sequelize"

export type Metadata = {
    name: string,
    date: Date
}

export const MetadataModel = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
}