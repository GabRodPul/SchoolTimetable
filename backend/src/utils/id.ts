import { DataTypes } from "sequelize";

const defineId = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}

export { defineId };