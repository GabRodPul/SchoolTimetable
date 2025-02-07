import { vi, expect } from "vitest"
// import { beforeAll, describe, test } from "@jest/globals";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { TestApp } from "../_utils";
import { AuthData, Id, WarningData } from "#common/@types/models";
import { UserRole } from "#common/@enums/models";

const mockWrning: WarningData & Id = {
  id: 1134,
  teacherId: 123,
  description: "Existing Warning",
  startDate: "00/20/2000",
  endDate: "09/20/2000",
  startHour: "09:00",
  endHour: "11:00",
};

const mockAuth: AuthData = {
  user: {
    id: 1234,
    name: "John Testson",
    email: "john@test.son",
    password: "johnpassword",
    phoneNumber: "+34987654321",
    role: UserRole.Teacher,
  },
  accessToken: "johntoken"
};

beforeEach(async () => {
  localStorage.clear();
  vi.resetAllMocks();
});

describe("assets/componets/FormalitiesCopms/Desktop/FormalitiesDesktop.tsx - formalities__form", () => {
  test("1 - Render Page: OK", () => {
    localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    render(<TestApp init="/formalities" />);

    expect(screen.getByText("Realizar Trámites")).toBeInTheDocument();

  });

  test("2 - Making sure that the inputs work", () => {
    localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    render(<TestApp init="/formalities" />);

    // Simulando el cambio en el input de descripción
    const descriptionInput = screen.getByPlaceholderText("Motivo de la ausencia");
    fireEvent.change(descriptionInput, { target: { value: "Falta por enfermedad" } });

    // Simulando el cambio en los inputs de horas
    const startHourInput = screen.getByPlaceholderText("Hora de inicio");
    fireEvent.change(startHourInput, { target: { value: "08:00" } });

    const endHourInput = screen.getByPlaceholderText("Hora de fin");
    fireEvent.change(endHourInput, { target: { value: "09:00" } });

    // Simulando la selección de fechas
    const startDatePicker = screen.getByPlaceholderText("00/20/2000");
    fireEvent.click(startDatePicker);

    // Espera que el calendario se haya abierto
    const startDay = screen.getByText("15"); // Simulamos que seleccionamos el día 15
    fireEvent.click(startDay);

    // Abre el calendario para la fecha de fin
    const endDatePicker = screen.getByPlaceholderText("06/20/2000");
    fireEvent.click(endDatePicker);

    // Espera que el calendario se haya abierto
    const endDay = screen.getByText("17"); // Simulamos que seleccionamos el día 17
    fireEvent.click(endDay);

    // Verificación de los valores
    expect(descriptionInput).toHaveValue("Falta por enfermedad");
    expect(startHourInput).toHaveValue("08:00");
    expect(endHourInput).toHaveValue("09:00");

    // Verifica si las fechas están correctamente seleccionadas
    expect(screen.getByDisplayValue(/15/)).toBeInTheDocument(); // Fecha de inicio
    expect(screen.getByDisplayValue(/17/)).toBeInTheDocument(); // Fecha de fin
  });

  test(" 3- Should display an alert if any required field is missing", () => {
    // Configuramos el espía para window.alert
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => { });

    localStorage.setItem("currentUser", JSON.stringify(mockAuth));
    render(<TestApp init="/formalities" />);

    // Simula el envío del formulario sin completar los campos
    const submitButton = screen.getByText(/Crear/i);
    fireEvent.click(submitButton);

    // Verifica que se haya llamado a window.alert con el mensaje esperado
    expect(alertSpy).toHaveBeenCalledWith("Todos los campos son obligatorios.");

    // Restauramos el espía
    alertSpy.mockRestore();
  });

  test("4 - Should create a new warning", async () => {
    localStorage.setItem("currentUser", JSON.stringify(mockAuth));

    render(<TestApp init="/formalities" />);

    // Simulando el cambio en el input de descripción
    const descriptionInput = screen.getByPlaceholderText("Motivo de la ausencia");
    fireEvent.input(descriptionInput, { target: { value: "Falta por enfermedad" } });

    // Simulando el cambio en los inputs de horas
    const startHourInput = screen.getByPlaceholderText("Hora de inicio");
    fireEvent.input(startHourInput, { target: { value: "08:00" } });

    const endHourInput = screen.getByPlaceholderText("Hora de fin");
    fireEvent.input(endHourInput, { target: { value: "09:00" } });

    // Simulando la selección de fechas
    const startDatePicker = screen.getByPlaceholderText("00/20/2000");
    fireEvent.click(startDatePicker);

    // Espera que el calendario se haya abierto
    const startDay = screen.getByText("15"); // Simulamos que seleccionamos el día 15
    fireEvent.click(startDay);

    // Abre el calendario para la fecha de fin
    const endDatePicker = screen.getByPlaceholderText("06/20/2000");
    fireEvent.click(endDatePicker);

    // Espera que el calendario se haya abierto
    const endDay = screen.getByText("17"); // Simulamos que seleccionamos el día 17
    fireEvent.click(endDay);

    //despesu
    vi.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockWrning),
      } as Response);
    });

    const submitButton = screen.getByTestId("warning-test-form");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(await (window.fetch("/api/warnings")).then(d => d.json())).toEqual(mockWrning);

  });

test("5 - Should create and update a warning", async () => {
  localStorage.setItem("currentUser", JSON.stringify(mockAuth));

    render(<TestApp init="/formalities" />);

    // Crear un nuevo warning
    const descriptionInput = screen.getByPlaceholderText("Motivo de la ausencia");
    fireEvent.input(descriptionInput, { target: { value: "Falta por enfermedad" } });

    const startHourInput = screen.getByPlaceholderText("Hora de inicio");
    fireEvent.input(startHourInput, { target: { value: "08:00" } });

    const endHourInput = screen.getByPlaceholderText("Hora de fin");
    fireEvent.input(endHourInput, { target: { value: "09:00" } });

    const startDatePicker = screen.getByPlaceholderText("00/20/2000");
    fireEvent.click(startDatePicker);
    const startDay = screen.getByText("15"); // Simulamos que seleccionamos el día 15
    fireEvent.click(startDay);

    const endDatePicker = screen.getByPlaceholderText("06/20/2000");
    fireEvent.click(endDatePicker);
    const endDay = screen.getByText("17"); // Simulamos que seleccionamos el día 17
    fireEvent.click(endDay);

    const submitButton = screen.getByTestId("warning-test-form");
    await waitFor(() => {
        fireEvent.submit(submitButton);
    });

    // Verifica que el warning se haya creado
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(await (window.fetch("/api/warnings")).then(d => d.json())).toEqual([mockWrning]);

    // Ahora busca el warning y edítalo
    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    // Cambia los valores de los campos
    fireEvent.change(screen.getByPlaceholderText("Motivo de la ausencia"), { target: { value: "Falta por vacaciones" } });
    fireEvent.change(screen.getByPlaceholderText("Hora de inicio"), { target: { value: "09:00" } });
    fireEvent.change(screen.getByPlaceholderText("Hora de fin"), { target: { value: "10:00" } });

    // Simula la selección de nuevas fechas
    fireEvent.change(screen.getByPlaceholderText('00/20/2000'), { target: { value: '2000-01-03' } });
    fireEvent.change(screen.getByPlaceholderText('06/20/2000'), { target: { value: '2000-01-04' } });

    // Envía el formulario para actualizar
    await waitFor(() => {
        fireEvent.submit(submitButton);
    });

    // Verifica que el warning se haya actualizado
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(await (window.fetch("/api/warnings/1")).then(d => d.json())).toEqual({
        ...mockWrning,
        description: "Falta por vacaciones",
        startHour: "09:00",
        endHour: "10:00",
        startDate: "2000-01-03",
        endDate: "2000-01-04",
    });

    // Limpia el mock de fetch
    vi.restoreAllMocks();
});


});


