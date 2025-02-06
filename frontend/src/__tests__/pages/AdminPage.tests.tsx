import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, SessionChangeData } from "#common/@types/models";
import { UserRole, WorkDay } from "#common/@enums/models";

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

const mockWarnig: SessionChangeData & Id = {
    id: 1,
    sessionId: 111,
    classHourId: 222,
    day: WorkDay.Monday,
    startDate: "06/02/2025",
    endDate: "21/02/25"
};

beforeEach(async () => {
    localStorage.clear();
    vi.resetAllMocks();
});

describe("assets/components/AdminComps/SessionsChangedCrud.tsx - SessionChanged - form"), () => {
    test("Render: OK", () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/login" />);
        const emailLabel = screen.getByText(/Email/);
        expect(emailLabel).toBeInTheDocument();
    });
}