import { GroupData, Id } from "#common/@types/models";
import { envvars } from "#src/env";
import { DB } from "#src/models";
import { describe, expect, test } from "@jest/globals";
import request from "supertest"
import { app } from "../index";
import utils from "#src/utils/utils";


const epTestData: GroupData & Id = {
  id: 1,
  name: "DAW2M",
};

const epTestUpdateData: GroupData & Id = {
  id: 2,
  name: "DAW2T",
};

beforeAll(async () => {

  await DB.sequelize.authenticate(); // Verifica la conexión antes de operar
  await DB.groups.destroy({ where: {} });
  const data = await DB.groups.bulkCreate([
    epTestData,
  ]);
});

describe("controller/group.view.controller.ts - Endpoints", () => {
  test("POST /groups2 - Empty body", async () => {
    const res = await request(app)
      .post("/groups2")
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.body.code).toEqual(500);
    expect(res.body).toHaveProperty("message");
  });

  test("POST /groups2 - Should create a new group", async () => {
    const res = await request(app)
      .post("/groups2")
      .send(epTestData)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(200);
  });

  test("GET /groups2/edit/1 - Should show edit form for a group", async () => {
    const res = await request(app).get(`/groups2/edit/${epTestData.id}`)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(200);
  });

  test("POST /groups2/update/1 - Should update a group", async () => {
    const res = await request(app)
      .post(`/groups2/update/${epTestData.id}`)
      .send(epTestUpdateData)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(200);
  });

  test("POST /groups2/delete/1 - Should delete a group", async () => {
    const res = await request(app).post(`/groups2/delete/${epTestData.id}`)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(302);
  });

  test("GET /groups2/edit/1 - Fail uptate empty body/unvalid Id", async () => {
    const res = await request(app).get("/groups2/update/10500")
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(400);
  });

  test("POST /groups2/update/1 - Update with empty body", async () => {
    const res = await request(app)
      .post("/groups2/updates/2")
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(404); // Redirección después de actualizar
  });

  test("POST /groups2/delete/1 - Delete unvalid Id", async () => {
    const res = await request(app).post("/groups2/delete/")
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(404); // Redirección después de eliminar
  });
});

afterAll(async () => {
  await DB.sequelize.close(); // O el método que uses para cerrar la conexión
});

