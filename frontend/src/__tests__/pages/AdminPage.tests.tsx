import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, WarningData } from "#common/@types/models";
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

const mockWarning: WarningData & Id = {
    id: 1134,
    teacherId: 123,
    description: "Existing Warning",
    startDate: "00/20/2000",
    endDate: "09/20/2000",
    startHour: "09:00",
    endHour: "11:00",
};

beforeEach(async () => {
    localStorage.clear();
    vi.resetAllMocks();
});

describe("assets/components/AdminComps/WarningsCrud.tsx - Warnings - form", () => {
    // test("Render: OK", () => {
    //     localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    //     render(<TestApp init="/admin" />);

    //     expect(screen.getByText("Gestión de Cambios de Sesión")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("ID Sesión")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("ID Hora de Clase")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("Fecha de Inicio")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("Fecha de Finalización")).toBeInTheDocument();

    // });

    test("Render: OK", () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/admin" />);

        expect(screen.getByText("Formulario de Avisos")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ID Profesor")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Descripción")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Fecha Inicio")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Fecha Fin")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Hora Inicio Asunto")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Hora Fin Asunto")).toBeInTheDocument();
    });


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

    test("Con este test se comprueba que los inputs funcionan", () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/admin" />);

        fireEvent.input(screen.getByPlaceholderText("ID Profesor"), {
            target: { value: "1" },
        });
        fireEvent.input(screen.getByPlaceholderText("Descripción"), {
            target: { value: "JEJE GOD" },
        });
        fireEvent.change(screen.getByPlaceholderText("Fecha Inicio"), {
            target: { value: "2025-02-06" }
        });
        fireEvent.input(screen.getByPlaceholderText("Fecha Fin"), {
            target: { value: "2025-02-21" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Inicio Asunto"), {
            target: { value: "08:00" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Fin Asunto"), {
            target: { value: "09:00" },
        });
    });

    test(" 3- Should display an alert if any required field is missing", async () => {

        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => { });

        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
        render(<TestApp init="/admin" />);

        const submitButton = screen.getByTestId("submit-buttom-warning");

        await act(async () => {
            fireEvent.submit(submitButton);
        });

        expect(alertSpy).toHaveBeenCalledWith("Todos los campos son obligatorios y deben ser válidos.");

        alertSpy.mockRestore();
    });

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


    test("Permite crear una nueva sesión correctamente", async () => {

        localStorage.setItem("currentUser", JSON.stringify(mockAuth));

        render(<TestApp init="/admin" />);

        // Llenamos el formulario
        fireEvent.input(screen.getByPlaceholderText("ID Profesor"), {
            target: { value: "1" },
        });
        fireEvent.input(screen.getByPlaceholderText("Descripción"), {
            target: { value: "JEJE GOD" },
        });
        fireEvent.change(screen.getByPlaceholderText("Fecha Inicio"), {
            target: { value: "2025-02-06" }
        });
        fireEvent.input(screen.getByPlaceholderText("Fecha Fin"), {
            target: { value: "2025-02-21" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Inicio Asunto"), {
            target: { value: "08:00" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Fin Asunto"), {
            target: { value: "09:00" },
        });

        vi.spyOn(window, "fetch").mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockWarning),
            } as Response);
        });

        const form = screen.getByTestId('warnings-crud-form');

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(window.fetch).toHaveBeenCalledTimes(2);

        expect(await (window.fetch("/api/warinings")).then(d => d.json())).toEqual(mockWarning);
    });


    // test("Permite crear y luego editar una sesión existente", async () => {
    //     localStorage.setItem("currentUser", JSON.stringify(mockAuth));

    //     render(<TestApp init="/admin" />);

    //     // Completar el formulario con una nueva sesión
    //     fireEvent.input(screen.getByPlaceholderText("ID Sesión"), {
    //         target: { value: "4" },
    //     });
    //     fireEvent.input(screen.getByPlaceholderText("ID Hora de Clase"), {
    //         target: { value: "4" },
    //     });
    //     fireEvent.change(screen.getByLabelText("WorkDay"), { target: { value: WorkDay.Friday } });

    //     fireEvent.input(screen.getByPlaceholderText("Fecha de Inicio"), {
    //         target: { value: "2025-02-06" },
    //     });
    //     fireEvent.input(screen.getByPlaceholderText("Fecha de Finalización"), {
    //         target: { value: "2025-02-21" },
    //     });

    //     vi.spyOn(window, "fetch").mockImplementation(async (url) => {
    //         console.log("Interceptando fetch:", url.toString());

    //         if (url.toString().includes("/api/session-changed")) {
    //             console.log("Devolviendo mock de sesión:", [mockSession]); // 🔍 Depuración
    //             return Promise.resolve({
    //                 json: () => Promise.resolve([mockSession]), // Devuelve un array con la nueva sesión
    //             } as Response);
    //         }

    //         return Promise.reject(new Error("Endpoint no encontrado"));
    //     });



    //     const form = screen.getByTestId('session-change-form');

    //     await act(async () => {
    //         fireEvent.submit(form);
    //     });

    //     await waitFor(() => {
    //         screen.debug(); // 🔍 Muestra el HTML actual en la consola
    //     });

    //     expect(window.fetch).toHaveBeenCalledTimes(2);

    //     const response = await window.fetch("/api/session-changed");
    //     const data = await response.json();
    //     console.log("Datos devueltos por fetch:", data); // 🔍 Depuración



    //     // Esperar a que la nueva sesión aparezca en la lista
    //     await screen.findByText("ID Sesión: 4");

    //     await waitFor(() => {
    //         fireEvent.click(screen.getByTestId("button-edit-list"));
    //     });

    //     // Verificar que los inputs tengan los valores de la sesión creada
    //     expect(screen.getByPlaceholderText("ID Sesión")).toHaveValue(4);
    //     expect(screen.getByPlaceholderText("ID Hora de Clase")).toHaveValue(4);
    //     expect(screen.getByPlaceholderText("Fecha de Inicio")).toHaveValue("2025-02-06");
    //     expect(screen.getByPlaceholderText("Fecha de Finalización")).toHaveValue("2025-02-21");

    //     // Modificar los valores en los inputs
    //     fireEvent.change(screen.getByPlaceholderText("ID Sesión"), { target: { value: 5 } });
    //     fireEvent.change(screen.getByPlaceholderText("ID Hora de Clase"), { target: { value: 5 } });
    //     fireEvent.change(screen.getByPlaceholderText("Fecha de Inicio"), { target: { value: "2025-03-01" } });
    //     fireEvent.change(screen.getByPlaceholderText("Fecha de Finalización"), { target: { value: "2025-03-15" } });

    //     // Hacer clic en "Editar" para guardar los cambios
    //     fireEvent.click(screen.getByTestId("ButtonTest-edit"));

    //     // Esperar a que la lista se actualice con los nuevos valores
    //     await waitFor(() => {
    //         expect(screen.getByText("ID Sesión: 5")).toBeInTheDocument();
    //         expect(screen.getByText("ID Hora de Clase: 5")).toBeInTheDocument();
    //         expect(screen.getByText("Fecha de Inicio: 2025-03-01")).toBeInTheDocument();
    //         expect(screen.getByText("Fecha de Finalización: 2025-03-15")).toBeInTheDocument();
    //     });
    // });



    test("Elimina un aviso correctamente", async () => {
        localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    
        const mockWarnings = [mockWarning];
        
        const mockDelete = vi.fn((id) => {
            const index = mockWarnings.findIndex(w => w.id === id.id);
            if (index !== -1) mockWarnings.splice(index, 1);
            return Promise.resolve();
        });
    
        const mockPost = vi.fn((newWarning) => {
            const createdWarning = { id: 1135, ...newWarning };
            mockWarnings.push(createdWarning);
            return Promise.resolve({
                json: () => Promise.resolve(createdWarning),
            } as Response);
        });
    
        const mockGetAll = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve(mockWarnings),
            } as Response)
        );
    
        vi.mock("../../../api/ApiContext", () => ({
            useApi: () => [
                {
                    state: "success",
                    data: mockWarnings,
                    getAll: mockGetAll,
                },
                {
                    post: mockPost,
                    delete: mockDelete,
                }
            ],
        }));
    
        render(<TestApp init="/admin" />);
    
        // Llenamos el formulario
        fireEvent.input(screen.getByPlaceholderText("ID Profesor"), {
            target: { value: "1" },
        });
        fireEvent.input(screen.getByPlaceholderText("Descripción"), {
            target: { value: "JEJE GOD" },
        });
        fireEvent.change(screen.getByPlaceholderText("Fecha Inicio"), {
            target: { value: "2025-02-06" }
        });
        fireEvent.input(screen.getByPlaceholderText("Fecha Fin"), {
            target: { value: "2025-02-21" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Inicio Asunto"), {
            target: { value: "08:00" },
        });
        fireEvent.input(screen.getByPlaceholderText("Hora Fin Asunto"), {
            target: { value: "09:00" },
        });
    
        // Enviamos el formulario
        const form = screen.getByTestId('warnings-crud-form');
        await act(async () => {
            fireEvent.submit(form);
        });
    
        // Verifica que se llamó al post con los datos correctos
        console.log("Post Call Arguments:", mockPost.mock.calls);
        expect(mockPost).toHaveBeenCalledWith({
            teacherId: 1,
            description: "JEJE GOD",
            startDate: "2025-02-06",
            endDate: "2025-02-21",
            startHour: "08:00",
            endHour: "09:00"
        });
    
        // Espera a que el botón de eliminar aparezca en el DOM
        const deleteButton = await screen.findByTestId("delete-button-warning");
        fireEvent.click(deleteButton);
    
        // Verifica que se haya llamado al delete con el ID correcto
        expect(mockDelete).toHaveBeenCalledWith({ id: 1135 });
    });
    
    
    

});