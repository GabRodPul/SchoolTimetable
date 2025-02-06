import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, WarningData } from "#common/@types/models";
import { UserRole } from "#common/@enums/models";

const mockWrning: WarningData & Id = {
  id: 1134,
  teacherId: 123,
  description: "Existing Warning",
  startDate: "",
  endDate: "",
  startHour: "09:00",
  endHour: "11:00",
};

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

describe("assets/componets/FormalitiesCopms/Desktop/FormalitiesDesktop.tsx - formalities__form", () => {
  test("Render: OK", () => {
    localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    render(<TestApp init="/formalities" />);

    const ejemplo = screen.getAllByText("Motivo");

    expect(ejemplo[0]).toBeInTheDocument();
    
  });
});
