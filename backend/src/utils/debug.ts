import { hashSync } from "bcrypt";
import { UserRole } from "../../../common/@enums/models";
import { DB } from "../models";

export const dbInit = async ( debug: boolean ) => {
    await DB.sequelize.sync({ force: debug, alter: debug }).then(() => {
        console.log("Drop and re-sync db.");
    });
    
    if (!debug) return;

    await DB.users.bulkCreate([
        {
            id:             1,
            name:           "Profe Número 1",
            email:          "profe1@email.com",
            image:          undefined,
            password:       hashSync("profenum1", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Teacher
        },
        {
            id:             2,
            name:           "Profe Número 2",
            email:          "profe2@email.com",
            image:          undefined,
            password:       hashSync("profenum2", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Teacher
        },
        {
            id:             3,
            name:           "Cabeza De Estudios",
            email:          "cabezaestudios@email.com",
            image:          undefined,
            password:       hashSync("cabezaestudios", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Head
        },
        {
            id:             4,
            name:           "Cabeza De Estudios",
            email:          "cabezaestudios@email.com",
            image:          undefined,
            password:       hashSync("cabezaestudios", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Head
        }
    ]);
} 