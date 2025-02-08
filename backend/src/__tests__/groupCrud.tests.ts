import { GroupData, Id } from "#common/@types/models";
import { envvars } from "#src/env";
import { DB } from "#src/models";
import { describe, expect, test } from "@jest/globals";
import request from "supertest"
import { initApp } from "../index";
import utils from "#src/utils/utils";


const epTestData: GroupData & Id = {
  id: 1111,
  name: "DAW2M",
};

const epTestUpdateData: GroupData & Id = {
  id: 2222,
  name: "DAW2T",
};

const viewsApp = initApp(false);

beforeAll(async () => {

  // await DB.sequelize.authenticate(); // Verifica la conexión antes de operar
  try {
    await DB.groups.destroy({ where: {} });
    const data = await DB.groups.bulkCreate([
      epTestData,
    ]);
  } catch (err: any) {
    console.log(err);
  }
});

describe("controller/group.view.controller.ts - Endpoints", () => {

  test("GET /groups2/create - Should show create form", async () => {
    const res = await request(viewsApp).get("/groups2/create");
    expect(res.status).toEqual(200);
  });

  test("POST /groups2 - Empty body", async () => {
    const res = await request(viewsApp)
      .post("/groups2")
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(400);
  });

  test("POST /groups2 - Should create a new group", async () => {
    const res = await request(viewsApp)
      .post("/groups2")
      .send(epTestData)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(200);
  });

  test("GET /groups2/edit - Should show edit form for a group", async () => {
    const res = await request(viewsApp).get(`/groups2/edit/${epTestData.id}`)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(200);
  });

  test("POST /groups2/update - Should update a group", async () => {
    const res = await request(viewsApp)
    .post(`/groups2/update/${epTestData.id}`)
    .send(epTestUpdateData)
    .set("Access-Control-Allow-Origin", "*")
    .set("Content-Type", "application/json");
    expect(res.status).toEqual(200);
  });
  
 test("GET /groups2/edit - Fail uptate unvalid Id", async () => {
    const res = await request(viewsApp).get("/groups2/update/10500")
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(404);
  });

  test("POST /groups2/update - Update with empty body", async () => {
    const res = await request(viewsApp)
      .post(`/groups2/update/${epTestData.id}`)
      .send({})
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(400); 
  });

  test("POST /groups2/delete - Should delete a group", async () => {
    const res = await request(viewsApp).post(`/groups2/delete/${epTestData.id}`)
    .set("Access-Control-Allow-Origin", "*")
    .set("Content-Type", "application/json");
    expect(res.status).toEqual(302);
  });

  test("POST /groups2/delete - Delete unvalid Id", async () => {
    const res = await request(viewsApp).post("/groups2/delete/")
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/json");
    expect(res.status).toEqual(404); // Redirección después de eliminar
  });
});

