import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData } from "#common/@types/models";
import { UserRole } from "#common/@enums/models";

const mockAuth: AuthData = {
  user: {
    id:           1234,
    name:         "John Testson",
    email:        "john@test.son",
    password:     "johnpassword",
    phoneNumber:  "+34987654321",
    role:         UserRole.Student,
  },
  accessToken: "johntoken"
};

beforeEach(async () => {
  localStorage.clear();
  vi.resetAllMocks();
});