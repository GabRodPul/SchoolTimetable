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

describe("assets/page/Login/LoginPage.tsx - LoginPageForm", () => {
  test("Render: OK", () => {
    render(<TestApp init="/login" />);
    const emailLabel = screen.getByText(/Email/);
    expect(emailLabel).toBeInTheDocument();
  });

  test("Should redirect inmediately when logged in", () => {
    localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    render(<TestApp init="/login" />);
    const timetableCard = screen.getAllByText("Página de Horarios");
    expect(timetableCard[0]).toBeInTheDocument();
  });

  test("Should be able to submit form", () => {
    const submitFn = vi.fn();
    render(<TestApp init="/login" />); 
    const submitBtn = screen.getByText("Entrar");
    submitBtn.onclick = submitFn;
    fireEvent.click(submitBtn);
    expect(submitFn).toHaveBeenCalledTimes(1);
  });

  test("Should both submit, \"fetch\" and redirect", async () => {
    const submitFn = vi.fn();
    render(<TestApp init="/login" />); 

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: mockAuth.user.email } });
    expect(emailInput.value).toBe(mockAuth.user.email);

    const passwordInput = screen.getByLabelText("Contraseña") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: mockAuth.user.password } });
    expect(passwordInput.value).toBe(mockAuth.user.password);
    
    vi.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockAuth),
      } as Response);
    });

    const submitBtn = screen.getByText("Entrar");
    submitBtn.onclick = submitFn;
    fireEvent.click(submitBtn);
    expect(submitFn).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(await (window.fetch("/api/login")).then(d => d.json())).toEqual(mockAuth);
  });
});