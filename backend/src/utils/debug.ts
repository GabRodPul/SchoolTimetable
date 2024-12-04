import { hashSync } from "bcrypt";
import { Turn, UserRole } from "../../../common/@enums/models";
import { DB } from "../models";

export const dbInit = async ( debug: boolean ) => {
    await DB.sequelize.sync({ force: debug, alter: debug });
    console.log("Drop and re-sync db.");
    
    if (!debug) return;

    await DB.users.bulkCreate([
        {
            id:             1,
            name:           "Profe Número 1",
            email:          "profe1@gmail.com",
            image:          undefined,
            password:       hashSync("profenum1", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Teacher
        },
        {
            id:             2,
            name:           "Profe Número 2",
            email:          "profe2@gmail.com",
            image:          undefined,
            password:       hashSync("profenum2", 10),
            phoneNumber:    "+34922222222",
            role:           UserRole.Teacher
        },
        {
            id:             3,
            name:           "Cabeza De Estudios",
            email:          "cabezaestudios@gmail.com",
            image:          undefined,
            password:       hashSync("cabezaestudios", 10),
            phoneNumber:    "+34933333333",
            role:           UserRole.Head
        },
        {
            id:             4,
            name:           "Cabeza De Estudios",
            email:          "cabezaestudios@gmail.com",
            image:          undefined,
            password:       hashSync("cabezaestudios", 10),
            phoneNumber:    "+3490000000",
            role:           UserRole.Head
        },
        {
            id:             5,
            name:           "Alumnado Número 1",
            email:          "alumnadonum1@gmail.com",
            image:          undefined,
            password:       hashSync("alumnadonum1", 10),
            phoneNumber:    "+34611111111",
            role:           UserRole.Student
        },
        {
            id:             6,
            name:           "Alumnado Número 2",
            email:          "alumnadonum2@gmail.com",
            image:          undefined,
            password:       hashSync("alumnadonum2", 10),
            phoneNumber:    "+34622222222",
            role:           UserRole.Student
        },
        {
            id:             7,
            name:           "Alumnado Número 3",
            email:          "alumnadonum3@gmail.com",
            image:          undefined,
            password:       hashSync("alumnadonum3", 10),
            phoneNumber:    "+34633333333",
            role:           UserRole.Student
        },
        {
            id:             8,
            name:           "Alumnado Número 4",
            email:          "alumnadonum4@gmail.com",
            image:          undefined,
            password:       hashSync("alumnadonum4", 10),
            phoneNumber:    "+34644444444",
            role:           UserRole.Student
        },
        {
            id:             9,
            name:           "Profe Número 3",
            email:          "profe1@gmail.com",
            image:          undefined,
            password:       hashSync("profenum1", 10),
            phoneNumber:    "+34987654321",
            role:           UserRole.Teacher
        },
        {
            id:             10,
            name:           "Profe Número 4",
            email:          "profe2@gmail.com",
            image:          undefined,
            password:       hashSync("profenum2", 10),
            phoneNumber:    "+34922222222",
            role:           UserRole.Teacher
        },
    ]);

    // Storing these for clearer data creation
    const dbgGrp = {
        DAW2M: { id: 1,    name: "DAW2M" },
        DAW2T: { id: 2,    name: "DAW2T" },
        DAW2N: { id: 3,    name: "DAW2N" },
        DAM2M: { id: 4,    name: "DAM2M" },
        DAM2T: { id: 5,    name: "DAM2T" },
        DAM2N: { id: 6,    name: "DAM2N" },
    }

    await DB.groups.bulkCreate([
        dbgGrp.DAW2M, 
        dbgGrp.DAW2T, 
        dbgGrp.DAW2N,
        dbgGrp.DAM2M, 
        dbgGrp.DAM2T, 
        dbgGrp.DAM2N,
    ]);

    // Storing these for clearer data creation
    await DB.classHour.bulkCreate([
        {
            id:             1,
            turn:           Turn.Afternoon,
            sessionHour:    1,
            start:          "15:00:00",
            end:            "15:55:00",
        },
        {
            id:             2,
            turn:           Turn.Afternoon,
            sessionHour:    2,
            start:          "15:55:01",
            end:            "16:50:00",
        },
        {
            id:             3,
            turn:           Turn.Afternoon,
            sessionHour:    3,
            start:          "16:50:01",
            end:            "17:45:00",
        },
        {
            id:             4,
            turn:           Turn.Afternoon,
            sessionHour:    4,
            start:          "18:00:01",
            end:            "18:55:00",
        },
        {
            id:             5,
            turn:           Turn.Afternoon,
            sessionHour:    5,
            start:          "18:55:01",
            end:            "19:50:00",
        },
        {
            id:             6,
            turn:           Turn.Afternoon,
            sessionHour:    6,
            start:          "19:50:01",
            end:            "20:45:00",
        },
        {
            id:             7,
            turn:           Turn.Morning,
            sessionHour:    1,
            start:          "08:00:00",
            end:            "08:55:00",
        },
    ]);


    const dbgMod = {
        FCT: { id:   1,  name: "FCT" },
        PRW: { id:   2,  name: "PRW" },
        DOR: { id:   3,  name: "DOR" },
        DPL: { id:   4,  name: "DPL" },
        DSW: { id:   5,  name: "DSW" },
        DEW: { id:   6,  name: "DEW" },
        PGV: { id:   7,  name: "PGV" },
        AED: { id:   8,  name: "AED" },
        DAD: { id:   9,  name: "DAD" },
        SSG: { id:  10,  name: "SSG" },
        PGL: { id:  11,  name: "PGL" },
        EMR: { id:  12,  name: "EMR" },
    };

    await DB.modules.bulkCreate([
        dbgMod.FCT,
        dbgMod.PRW,
        dbgMod.DOR,
        dbgMod.DPL,
        dbgMod.DSW,
        dbgMod.DEW,
        dbgMod.PGV,
        dbgMod.AED,
        dbgMod.DAD,
        dbgMod.SSG,
        dbgMod.PGL,
        dbgMod.EMR,
    ]);


    await DB.igt_modules.bulkCreate([
        // 2ºDAW
        // * DOR
        { id:  1, teacherId: 1, groupId: dbgGrp.DAW2M.id, moduleId: dbgMod.DOR.id, weeklyHours: 6 },
        { id:  2, teacherId: 1, groupId: dbgGrp.DAW2T.id, moduleId: dbgMod.DOR.id, weeklyHours: 6 },
        { id:  3, teacherId: 1, groupId: dbgGrp.DAW2N.id, moduleId: dbgMod.DOR.id, weeklyHours: 3 },

        // * DPL
        { id:  4, teacherId: 1, groupId: dbgGrp.DAW2M.id, moduleId: dbgMod.DPL.id, weeklyHours: 6 },
        { id:  5, teacherId: 1, groupId: dbgGrp.DAW2T.id, moduleId: dbgMod.DPL.id, weeklyHours: 6 },
        { id:  6, teacherId: 1, groupId: dbgGrp.DAW2N.id, moduleId: dbgMod.DPL.id, weeklyHours: 3 },

        // * DSW
        { id:  7, teacherId: 1, groupId: dbgGrp.DAW2M.id, moduleId: dbgMod.DSW.id, weeklyHours: 8 },
        { id:  8, teacherId: 1, groupId: dbgGrp.DAW2T.id, moduleId: dbgMod.DSW.id, weeklyHours: 8 },
        { id:  9, teacherId: 1, groupId: dbgGrp.DAW2N.id, moduleId: dbgMod.DSW.id, weeklyHours: 5 },

        // * DEW
        { id: 10, teacherId: 1, groupId: dbgGrp.DAW2M.id, moduleId: dbgMod.DEW.id, weeklyHours: 7 },
        { id: 11, teacherId: 1, groupId: dbgGrp.DAW2T.id, moduleId: dbgMod.DEW.id, weeklyHours: 7 },
        { id: 12, teacherId: 1, groupId: dbgGrp.DAW2N.id, moduleId: dbgMod.DEW.id, weeklyHours: 4 },

        // * EMR
        { id: 13, teacherId: 1, groupId: dbgGrp.DAW2M.id, moduleId: dbgMod.EMR.id, weeklyHours: 3 },
        { id: 14, teacherId: 1, groupId: dbgGrp.DAW2T.id, moduleId: dbgMod.EMR.id, weeklyHours: 3 },
        { id: 15, teacherId: 1, groupId: dbgGrp.DAW2N.id, moduleId: dbgMod.EMR.id, weeklyHours: 1 },

        
        // 2ºDAM
        // * PGV
        { id: 16, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.PGV.id, weeklyHours: 3 },
        { id: 17, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.PGV.id, weeklyHours: 3 },
        { id: 18, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.PGV.id, weeklyHours: 2 },

        // * AED
        { id: 19, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.AED.id, weeklyHours: 7 },
        { id: 20, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.AED.id, weeklyHours: 7 },
        { id: 21, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.AED.id, weeklyHours: 4 },

        // * DAD
        { id: 22, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.DAD.id, weeklyHours: 6 },
        { id: 23, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.DAD.id, weeklyHours: 6 },
        { id: 24, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.DAD.id, weeklyHours: 4 },

        // * SSG
        { id: 25, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.SSG.id, weeklyHours: 5 },
        { id: 26, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.SSG.id, weeklyHours: 5 },
        { id: 27, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.SSG.id, weeklyHours: 3 },

        // * PGL
        { id: 28, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.PGL.id, weeklyHours: 4 },
        { id: 29, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.PGL.id, weeklyHours: 4 },
        { id: 30, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.PGL.id, weeklyHours: 2 },
        
        // * EMR
        { id: 31, teacherId: 1, groupId: dbgGrp.DAM2M.id, moduleId: dbgMod.EMR.id, weeklyHours: 3 },
        { id: 32, teacherId: 1, groupId: dbgGrp.DAM2T.id, moduleId: dbgMod.EMR.id, weeklyHours: 3 },
        { id: 33, teacherId: 1, groupId: dbgGrp.DAM2N.id, moduleId: dbgMod.EMR.id, weeklyHours: 1 },
    ]);
};1