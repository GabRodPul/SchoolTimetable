import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, SessionChangeData } from "#common/@types/models";
import { UserRole, WorkDay } from "#common/@enums/models";

// Mock de la API
const mockPost = vi.fn((data) => {
    console.log("Mock Post Called with:", data);  // Ver si la función se ejecuta
    return Promise.resolve();  // Simula respuesta exitosa
});

vi.mock("../../../api/ApiContext", () => ({
    useApi: () => [
        { state: "success", data: [] }, // Simula respuesta exitosa de la API
        { post: mockPost, getAll: vi.fn() }, // Espiamos `post`
    ],
}));

const mockAuth: AuthData = {
    user: {
        id: 1234,
        name: "John Testson",
        email: "john@test.son",
        password: "johnpassword",
        phoneNumber: "+34987654321",
        role: UserRole.Student,
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

describe("assets/components/AdminComps/SessionsChangedCrud.tsx - SessionChanged - form", () => {
    test("Render: OK", () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/admin" />);
        const ejemplo = screen.getByPlaceholderText("ID Sesión");
        expect(ejemplo).toBeInTheDocument();
    });

    test("El componente se renderiza correctamente con el título y el formulario", () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/admin" />);

        expect(screen.getByText("Gestión de Cambios de Sesión")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ID Sesión")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ID Hora de Clase")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Fecha de Inicio")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Fecha de Finalización")).toBeInTheDocument();
    });

    test("Permite crear una nueva sesión correctamente", async () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));

        render(<TestApp init="/admin" />);

        // Llenamos el formulario
        fireEvent.input(screen.getByPlaceholderText("ID Sesión"), {
            target: { value: "1" },
        });
        fireEvent.input(screen.getByPlaceholderText("ID Hora de Clase"), {
            target: { value: "2" },
        });
        fireEvent.change(screen.getByLabelText("WorkDay"), { target: { value: "Monday" } });

        fireEvent.input(screen.getByPlaceholderText("Fecha de Inicio"), {
            target: { value: "2025-02-06" },
        });
        fireEvent.input(screen.getByPlaceholderText("Fecha de Finalización"), {
            target: { value: "2025-02-21" },
        });

        const form = screen.getByTestId('session-change-form'); // Suponiendo que el formulario tiene un data-testid="formulario-sesion"

        await act(async () => {
            fireEvent.submit(form);  // Esto simula el envío del formulario
        });

        // 🔹 Verificamos que `mockPost` haya sido llamado
        expect(mockPost).toHaveBeenCalledTimes(1);

        // 🔹 Verificamos que los parámetros pasados a `mockPost` sean correctos
        expect(mockPost).toHaveBeenCalledWith({
            id: 1,
            sessionId: 2,
            classHourId: 2,
            day: WorkDay.Monday,
            startDate: "2025-02-06",
            endDate: "2025-02-21",
        });
    });


    // test("Permite editar una sesión existente", async () => {
    //     const mockSession = {
    //         id: 1,
    //         sessionId: 100,
    //         classHourId: 200,
    //         day: "Monday",
    //         startDate: "2025-02-06",
    //         endDate: "2025-02-21",
    //     };

    //     render(<TestApp init="/admin" />);

    //     // Simular que hay una sesión en la lista
    //     fireEvent.click(screen.getByText("Editar"));

    //     expect(screen.getByPlaceholderText("ID Sesión")).toHaveValue(100);
    //     expect(screen.getByPlaceholderText("ID Hora de Clase")).toHaveValue(200);
    //     expect(screen.getByPlaceholderText("Fecha de Inicio")).toHaveValue("2025-02-06");
    //     expect(screen.getByPlaceholderText("Fecha de Finalización")).toHaveValue("2025-02-21");
    // });

    // test("Elimina una sesión correctamente", async () => {
    //     const mockDelete = vi.fn(() => Promise.resolve());
    //     vi.mock("../../../api/ApiContext", () => ({
    //         useApi: () => [{ state: "success", data: [{ id: 1, sessionId: 100 }] }, { delete: mockDelete }],
    //     }));

    //     render(<TestApp init="/admin" />);

    //     fireEvent.click(screen.getByText("Eliminar"));

    //     expect(mockDelete).toHaveBeenCalledWith({ id: 1 });
    // });



});