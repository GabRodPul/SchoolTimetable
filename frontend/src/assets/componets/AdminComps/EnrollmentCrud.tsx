import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { EnrollmentData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import './CrudsStyles.css';
import { useScrollAnimation } from "./animationFade";

type Enrollment = EnrollmentData & Id;

const EnrollmentCrud: React.FC = () => {
    const [enrollments, api] = useApi<Enrollment>(ApiRts.Enrollmet);
    const ref = useScrollAnimation();
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
    const [formState, setFormState] = useState<Enrollment>({
        id: 0,
        studentId: 0,
        moduleId: 0,
    });

    useEffect(() => {
        api.getAll();
        // api.getStudents().then(setStudents);
        // api.getModules().then(setModules); 
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: parseInt(value, 10) }));
    };

    // Validación de campos antes de hacer el POST o PUT
    const validateForm = () => {
        const { studentId, moduleId } = formState;
        if (studentId <= 0 || moduleId <= 0) {
            alert("Debes seleccionar un estudiante y un módulo.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({ id: 0, studentId: 0, moduleId: 0 });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear la inscripción:", error);
        });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedEnrollment) return;
        api.put({ id: selectedEnrollment.id, body: formState }).then(() => {
            setSelectedEnrollment(null);
            setFormState({ id: 0, studentId: 0, moduleId: 0 });
            api.getAll();
        }).catch((error) => {
            console.error("Error al actualizar la matrícula:", error);
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error al borrar la matrícula:", error);
        });
    };

    const handleEdit = (enrollment: Enrollment) => {
        setSelectedEnrollment(enrollment);
        setFormState(enrollment);
    };

    if (enrollments.state === FetchState.Loading) return <p>Cargando...</p>;
    if (enrollments.state === FetchState.Error) return <p>Error: {enrollments.error?.message}</p>;

    return (
        <div ref={ref} className="crud__container animation">
            <h1 className="crud__title">Gestión de Matrículas</h1>

            <div className="crud__form">
                <h2>{selectedEnrollment ? "Editar" : "Crear"} Matrícula</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedEnrollment ? handleUpdate() : handleCreate();
                    }}
                >
                    <select
                        name="studentId"
                        value={formState.studentId}
                        onChange={handleInputChange}
                        className="crud__input"
                        aria-label="StudentPicker"
                        required
                    >
                        <option value={0}>Elija Estudiante</option>
                        {/* {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} ({student.email}) - {student.phoneNumber}
                            </option>
                        ))} */}
                    </select>

                    <select
                        name="moduleId"
                        value={formState.moduleId}
                        onChange={handleInputChange}
                        className="crud__input"
                        aria-label="ModulePicker"
                        required
                    >
                        <option value={0}>Elija Módulo</option>
                        {/* {modules.map(module => (
                            <option key={module.id} value={module.id}>
                                {module.name} ({module.name})
                            </option>
                        ))} */}
                    </select>

                    <button type="submit" className="crud__button">
                        {selectedEnrollment ? "Editar" : "Crear"}
                    </button>
                    {selectedEnrollment && (
                        <button
                            type="button"
                            onClick={() => setSelectedEnrollment(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            {/* <h2 className="crud__list_title">Listado de Matrículas</h2>
            <div className="crud__list">
                {(enrollments.state === FetchState.Success || enrollments.state === FetchState.SuccessMany) &&
                    Array.isArray(enrollments.data) && enrollments.data.map((enrollment) => {
                        return (
                            <div key={enrollment.id} className="crud__item">
                                <p>
                                    ID Estudiante: {enrollment.studentId}, ID Módulo: {enrollment.moduleId}
                                </p>
                                <div className="crud__buttonGroup">
                                    <button className="crud__button--edit" onClick={() => handleEdit(enrollment)}>Editar</button>
                                    <button className="crud__button--delete" onClick={() => handleDelete({ id: enrollment.id })}>Eliminar</button>
                                </div>
                            </div>
                        );
                    })}
            </div> */}
        </div>
    );
};

export default EnrollmentCrud;
