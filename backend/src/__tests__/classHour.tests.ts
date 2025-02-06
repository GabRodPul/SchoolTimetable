import { describe, expect, test, beforeAll, afterAll, jest } from "@jest/globals";
import { Turn } from "#common/@enums/models";
import { ClassHourData, Id } from "#common/@types/models";
import request from "supertest"
import { DB } from "#src/models";
import { app } from "../index";

const mwTestData: ClassHourData & Id = {
    id: 11111,
    turn: Turn.Morning,
    sessionHour: 1,
    start: "15:00:00",
    end: "15:55:00",
}
const updatedTestData: ClassHourData & Id = {
    id: 2222,
    turn: Turn.Morning,
    sessionHour: 2,
    start: "16:00:00",
    end: "16:55:00",

};

// let classHourId: number;

beforeAll(async () => {
    // Limpiar la tabla antes de las pruebas

    await DB.classHour.destroy({ where: {} });

    const data = await DB.classHour.bulkCreate([
        mwTestData,
        updatedTestData
    ]);
});

export const validateClassHour = (): boolean => {
    // Lógica de validación (ejemplo simple)
    const startHour = mwTestData.start;
    const endHour = mwTestData.end;
    return startHour < endHour;

};

describe("controllers/classHour.controller.ts - Validate Hours", () => {
    it('should return true for valid class hour', () => {
        const result = validateClassHour();
        expect(result).toBe(true);
    });
});

describe("controllers/classHour.controller.ts - Endpoints", () => {

    test("GET /classHour/create - Should show create form", async () => {
        const res = await request(app).get("/classHours/create");
        expect(res.status).toEqual(200);
    });

    test("POST /classHour - Should create a new class hour", async () => {
        const res = await request(app)
            .post("/classHours")
            .send(mwTestData)
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");

        expect(res.status).toEqual(200);
    });

    test("POST /classHour - Empty body", async () => {
        const res = await request(app)
            .post("/classHours")
            .send({})
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");

        expect(res.status).toEqual(400);
    });

    test("GET /classHour/edit/1 - Should show edit form for a class hour", async () => {
        const res = await request(app).get(`/classHours/edit/${mwTestData.id}`)
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
        expect(res.status).toEqual(200);
    });

    test("POST /classHour/update/1 - Should update a class hour", async () => {
        const res = await request(app)
            // .post(`/classHours/update/${mwTestData.id}`)
            .post(`/classHours/update/11111`)
            .send(updatedTestData)
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");

        console.log("Response status:", res.status); // Imprime el código de estado
        console.log("Response body:", res.body); // Imprime el contenido de la respuesta

        expect(res.status).toEqual(200);
    });

    test("GET /classHour/edit/1 - Fail uptate/unvalid Id", async () => {
        const res = await request(app).get("/classHours/update/10500")
            .send(updatedTestData)
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
        expect(res.status).toEqual(404);
    });

    test("POST /classHour/update/1 - Update Empty Body", async () => {
        const res = await request(app)
            .post(`/classHours/update/${mwTestData.id}`)
            .send({})
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
        expect(res.status).toEqual(400);
    });

    test("POST /classHour/delete/1 - Should delete a class hour", async () => {
        const res = await request(app).post(`/classHours/delete/${mwTestData.id}`)
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
        expect(res.status).toEqual(302);
    });

    test("POST /classHour/delete/1 - Delete unvalid Id", async () => {
        const res = await request(app).post("/classHours/delete/")
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
        expect(res.status).toEqual(404); // Redirección después de eliminar
    });

});
