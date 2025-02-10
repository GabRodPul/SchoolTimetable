import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, SessionChangeData } from "#common/@types/models";
import { UserRole, WorkDay } from "#common/@enums/models";

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

const mockSession: SessionChangeData & Id = {
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
    // test("Render: OK", () => {
    //     localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    //     render(<TestApp init="/admin" />);

    //     expect(screen.getByText("Gestión de Cambios de Sesión")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("ID Sesión")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("ID Hora de Clase")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("Fecha de Inicio")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("Fecha de Finalización")).toBeInTheDocument();

    // });


    // // test("El componente se renderiza correctamente con el título y el formulario", () => {
    // //     localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    // //     render(<TestApp init="/admin" />);

    // //     fireEvent.input(screen.getByPlaceholderText("ID Sesión"), {
    // //         target: { value: "1" },
    // //     });
    // //     fireEvent.input(screen.getByPlaceholderText("ID Hora de Clase"), {
    // //         target: { value: "2" },
    // //     });
    // //     fireEvent.change(screen.getByLabelText("WorkDay"), { target: { value: WorkDay.Monday } });

    // //     fireEvent.input(screen.getByPlaceholderText("Fecha de Inicio"), {
    // //         target: { value: "2025-02-06" },
    // //     });
    // //     fireEvent.input(screen.getByPlaceholderText("Fecha de Finalización"), {
    // //         target: { value: "2025-02-21" },
    // //     });



    // // });


    // test("Permite crear una nueva sesión correctamente", async () => {

    //     localStorage.setItem("currentUser", JSON.stringify(mockAuth));

    //     render(<TestApp init="/admin" />);

    //     // Llenamos el formulario
    //     fireEvent.input(screen.getByPlaceholderText("ID Sesión"), {
    //         target: { value: "1" },
    //     });
    //     fireEvent.input(screen.getByPlaceholderText("ID Hora de Clase"), {
    //         target: { value: "2" },
    //     });
    //     fireEvent.change(screen.getByLabelText("WorkDay"), { target: { value: WorkDay.Monday } });

    //     fireEvent.input(screen.getByPlaceholderText("Fecha de Inicio"), {
    //         target: { value: "2025-02-06" },
    //     });
    //     fireEvent.input(screen.getByPlaceholderText("Fecha de Finalización"), {
    //         target: { value: "2025-02-21" },
    //     });

    //     vi.spyOn(window, "fetch").mockImplementation(() => {
    //         return Promise.resolve({
    //             json: () => Promise.resolve(mockSession),
    //         } as Response);
    //     });

    //     const form = screen.getByTestId('session-change-form');

    //     await act(async () => {
    //         fireEvent.submit(form);
    //     });

    //     expect(window.fetch).toHaveBeenCalledTimes(2);

    //     expect(await (window.fetch("/api/session-changed")).then(d => d.json())).toEqual(mockSession);
    // });


    test("Permite crear y luego editar una sesión existente", async () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));

        render(<TestApp init="/admin" />);

        // Completar el formulario con una nueva sesión
        fireEvent.input(screen.getByPlaceholderText("ID Sesión"), {
            target: { value: "4" },
        });
        fireEvent.input(screen.getByPlaceholderText("ID Hora de Clase"), {
            target: { value: "4" },
        });
        fireEvent.change(screen.getByLabelText("WorkDay"), { target: { value: WorkDay.Friday } });

        fireEvent.input(screen.getByPlaceholderText("Fecha de Inicio"), {
            target: { value: "2025-02-06" },
        });
        fireEvent.input(screen.getByPlaceholderText("Fecha de Finalización"), {
            target: { value: "2025-02-21" },
        });

        vi.spyOn(window, "fetch").mockImplementation(async (url) => {
            console.log("Interceptando fetch:", url.toString());

            if (url.toString().includes("/api/session-changed")) {
                console.log("Devolviendo mock de sesión:", [mockSession]); // 🔍 Depuración
                return Promise.resolve({
                    json: () => Promise.resolve([mockSession]), // Devuelve un array con la nueva sesión
                } as Response);
            }

            return Promise.reject(new Error("Endpoint no encontrado"));
        });



        const form = screen.getByTestId('session-change-form');

        await act(async () => {
            fireEvent.submit(form);
        });

        await waitFor(() => {
            screen.debug(); // 🔍 Muestra el HTML actual en la consola
        });

        expect(window.fetch).toHaveBeenCalledTimes(2);

        const response = await window.fetch("/api/session-changed");
        const data = await response.json();
        console.log("Datos devueltos por fetch:", data); // 🔍 Depuración



        // Esperar a que la nueva sesión aparezca en la lista
        await screen.findByText("ID Sesión: 4");

        await waitFor(() => {
            fireEvent.click(screen.getByTestId("button-edit-list"));
        });

        // Verificar que los inputs tengan los valores de la sesión creada
        expect(screen.getByPlaceholderText("ID Sesión")).toHaveValue(4);
        expect(screen.getByPlaceholderText("ID Hora de Clase")).toHaveValue(4);
        expect(screen.getByPlaceholderText("Fecha de Inicio")).toHaveValue("2025-02-06");
        expect(screen.getByPlaceholderText("Fecha de Finalización")).toHaveValue("2025-02-21");

        // Modificar los valores en los inputs
        fireEvent.change(screen.getByPlaceholderText("ID Sesión"), { target: { value: 5 } });
        fireEvent.change(screen.getByPlaceholderText("ID Hora de Clase"), { target: { value: 5 } });
        fireEvent.change(screen.getByPlaceholderText("Fecha de Inicio"), { target: { value: "2025-03-01" } });
        fireEvent.change(screen.getByPlaceholderText("Fecha de Finalización"), { target: { value: "2025-03-15" } });

        // Hacer clic en "Editar" para guardar los cambios
        fireEvent.click(screen.getByTestId("ButtonTest-edit"));

        // Esperar a que la lista se actualice con los nuevos valores
        await waitFor(() => {
            expect(screen.getByText("ID Sesión: 5")).toBeInTheDocument();
            expect(screen.getByText("ID Hora de Clase: 5")).toBeInTheDocument();
            expect(screen.getByText("Fecha de Inicio: 2025-03-01")).toBeInTheDocument();
            expect(screen.getByText("Fecha de Finalización: 2025-03-15")).toBeInTheDocument();
        });
    });

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