import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormalitiesDesktop from './FormalitiesDesktop';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';

jest.mock('#src/api/ApiContext');

const mockApi = {
    getAll: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};

(useApi as jest.Mock).mockReturnValue([{}, mockApi]);

describe('FormalitiesDesktop', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render the component', () => {
        render(<FormalitiesDesktop />);
        expect(screen.getByText(/Trámites/i)).toBeInTheDocument();
    });

    test('should validate form and show alert if fields are empty', async () => {
        render(<FormalitiesDesktop />);
        fireEvent.click(screen.getByText(/Crear/i));
        expect(window.alert).toHaveBeenCalledWith("Todos los campos son obligatorios.");
    });

    test('should create a new warning', async () => {
        render(<FormalitiesDesktop />);
        fireEvent.change(screen.getByPlaceholderText(/Motivo de la ausencia/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByPlaceholderText(/Hora de inicio/i), { target: { value: '08:00' } });
        fireEvent.change(screen.getByPlaceholderText(/Hora de fin/i), { target: { value: '10:00' } });
        fireEvent.click(screen.getByText(/Crear/i));

        await waitFor(() => {
            expect(mockApi.post).toHaveBeenCalledWith(expect.objectContaining({
                description: 'Test Description',
                startHour: '08:00',
                endHour: '10:00',
            }));
        });
    });

    test('should update an existing warning', async () => {
        // Simular un warning seleccionado
        const selectedWarning = {
            id: 1,
            teacherId: 1,
            description: 'Existing Warning',
            startDate: '',
            endDate: '',
            startHour: '09:00',
            endHour: '11:00',
        };

        (useApi as jest.Mock).mockReturnValue([{ data: [selectedWarning], state: 'Success' }, mockApi]);

        render(<FormalitiesDesktop />);
        fireEvent.click(screen.getByText(/Editar/i));

        fireEvent.change(screen.getByPlaceholderText(/Motivo de la ausencia/i), { target: { value: 'Updated Description' } });
        fireEvent.click(screen.getByText(/Editar/i));

        await waitFor(() => {
            expect(mockApi.put).toHaveBeenCalledWith({ body: expect.objectContaining({ description: 'Updated Description' }), id: selectedWarning.id });
        });
    });

    test('should delete a warning', async () => {
        const warningToDelete = { id: 1 };

        render(<FormalitiesDesktop />);
        fireEvent.click(screen.getByText(/Eliminar/i));

        await waitFor(() => {
            expect(mockApi.delete).toHaveBeenCalledWith(warningToDelete.id);
        });
    });

    test('should handle errors during create, update, and delete', async () => {
        mockApi.post.mockRejectedValueOnce(new Error('Error creating'));
        render(<FormalitiesDesktop />);
        fireEvent.click(screen.getByText(/Crear/i));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Hubo un error al intentar crear el trámite.");
        });

        mockApi.put.mockRejectedValueOnce(new Error('Error updating'));
        fireEvent.click(screen.getByText(/Editar/i));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Hubo un error al intentar actualizar el trámite.");
        });

        mockApi.delete.mockRejectedValueOnce(new Error('Error deleting'));
        fireEvent.click(screen.getByText(/Eliminar/i));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Hubo un error al intentar eliminar el trámite.");
        });
    });
});