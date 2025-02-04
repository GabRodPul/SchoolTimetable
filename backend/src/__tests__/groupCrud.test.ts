import { GroupData, UserData } from "#common/@types/models";
import { envvars } from "#src/env";
import { DB } from "#src/models";
import { describe, expect, test } from "@jest/globals";
import request from "supertest"
import { app } from "../index";
import utils from "#src/utils/utils";


const epTestData: GroupData = { 
  name:         "Test POST",
};

beforeAll(async () => {{
  const data = await DB.groups.findOne({ 
    where: { name: envvars.ADMIN_EMAIL },
    raw: true
  });
} {
  const data = await DB.groups.create({
    ...epTestData,
  } as any);
}});


describe("controller/group.controller.ts - Endpoints", () => {
    test("POST /api/groups - Empty body", async () => {
      const res = await request(app)
        .post("/api/groups")
        .send({})
        .set("Access-Control-Allow-Origin", "*")
        .set("Content-Type", "application/json");
      console.log(`s:auth ${JSON.stringify(res.body)}`);
      expect(res.body.code).toEqual(500);
      expect(res.body).toHaveProperty("message");
    });

    test("POST /api/groups - Missing more than 1 field", async () => {
        const res = await request(app)
          .post("/api/signin")
          .send({ name: epTestData.name })
          .set("Access-Control-Allow-Origin", "*")
          .set("Content-Type", "application/json");
    
        expect(res.body.code).toEqual(400);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors.length).toBeGreaterThan(1);
      });

      test("POST /api/signin - Missing more than 1 field", async () => {
          const res = await request(app)
            .post("/api/signin")
            .send({ email: epTestData.email, password: epTestData.password })
            .set("Access-Control-Allow-Origin", "*")
            .set("Content-Type", "application/json");
      
          expect(res.body.code).toEqual(400);
          expect(res.body).toHaveProperty("errors");
          expect(res.body.errors.length).toBeGreaterThan(1);
        });
});

