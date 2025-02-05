// import { describe, expect, test } from "@jest/globals";
// import { hasRolePermissions, isAuthenticated, login, signin } from "../controllers/auth";
// // import { envvars } from "../env";
// import request from "supertest"
// import { initApp } from "../index";
// import { UserData } from "#common/@types/models";
// import { UserRole } from "#common/@enums/models";
// import { envvars } from "#src/env";
// import bodyParser from "body-parser";
// import { DB } from "#src/models";
// import utils from "#src/utils/utils";
// import bcrypt from "bcrypt";
// import { NextFunction, Request, Response } from "express";

// const mwTestData: UserData = {
//   name:         "Test Middleware",
//   email:        "middleware@test.com",
//   password:     "testmiddleware",
//   phoneNumber:  "+34987654321",
//   role:         UserRole.Student,  
// }

// const epTestData: UserData = { 
//   name:         "Test POST signin",
//   email:        "postsignin@test.com",
//   password:     "testpassword",
//   phoneNumber:  "+34987654321",
//   role:         UserRole.Student,
// };

// let MIDWR_TOKEN = "";
// let ADMIN_TOKEN = "";
// let apiApp = initApp(false);  // api
// // let viewsApp = initApp(true); // views

// beforeAll(async () => {
//   const aData = await DB.users.findOne({ 
//       where: { email: envvars.ADMIN_EMAIL },
//       raw: true
//     });
//   ADMIN_TOKEN = utils.generateToken(aData);
  
//   const uData = await DB.users.create({
//     ...mwTestData,
//     password: bcrypt.hashSync(mwTestData.password, 10)
//   } as any);
//   MIDWR_TOKEN = utils.generateToken(uData);
// });

// describe("controllers/auth.ts - Endpoints", () => {
//   test("POST /api/signin - Empty body", async () => {
//     const res = await request(apiApp)
//       .post("/api/signin")
//       .send({})
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");
//     console.log(`s:auth ${JSON.stringify(res.body)}`);
//     expect(res.body.code).toEqual(500);
//     expect(res.body).toHaveProperty("message");
//   });

//   test("POST /api/signin - Missing more than 1 field", async () => {
//     const res = await request(apiApp)
//       .post("/api/signin")
//       .send({ email: epTestData.email, password: epTestData.password })
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");

//     expect(res.body.code).toEqual(400);
//     expect(res.body).toHaveProperty("errors");
//     expect(res.body.errors.length).toBeGreaterThan(1);
//   });

//   test("POST /api/signin - Should sign up", async () => {
//     const res = await request(apiApp)
//       .post("/api/signin")
//       .send(epTestData)
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");

//     expect(res.body).toHaveProperty("user");
//     expect(res.body).toHaveProperty("accessToken");
//   });

//   test("POST /api/login - Empty body", async () => {
//     const res = await request(apiApp)
//       .post("/api/login")
//       .send({})
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");

//     expect(res.body.code).toEqual(401);
//     expect(res.body.message).toEqual("Email & password are needed for login!");
//   });

//   test("POST /api/login - Wrong password", async () => {
//     const res = await request(apiApp)
//       .post("/api/login")
//       .send({ email: epTestData.email, password: "___asdfghjkl" })
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");

//     expect(res.body.code).toEqual(401);
//     expect(res.body.message).toEqual("Password not valid!");
//   });

//   test("POST /api/login - Should log in", async () => {
//     const res = await request(apiApp)
//       .post("/api/login")
//       .send({
//         email:    epTestData.email,
//         password: epTestData.password,
//       })
//       .set("Access-Control-Allow-Origin", "*")
//       .set("Content-Type", "application/json");

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("user");
//     expect(res.body).toHaveProperty("accessToken");
//   });
// });