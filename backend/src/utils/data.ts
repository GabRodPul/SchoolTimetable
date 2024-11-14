import { DataTypes } from "sequelize";

const defineId = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}

const currDate = () => {
    const now = Date.now();
    return { createdAt: now, updatedAt: now };
}

export { defineId, currDate };