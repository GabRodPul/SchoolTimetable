import React, { useEffect, useState } from 'react';
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu'; // Importar el componente correctamente
import { LuBellRing } from 'react-icons/lu';
import './FormalitiesPageStyles.css';

type FormalitieType = "Baja" | "Ausencia";

//* Define la interfaz para el estado
interface Formalitie {
    type: FormalitieType;
    motive: string;
    startDate: string;
    endDate: string;
}

const Formalities: React.FC = () => {
    const [formalities, setFormalities] = useState<Formalitie[]>([]);
    const [newFormalitie, setNewFormalitie] = useState<Formalitie>({
        type: "Baja",
        motive: "",
        startDate: "",
        endDate: "",
    });

    // Recuperar datos del localStorage al montar el componente
    useEffect(() => {
        const storedFormalities = localStorage.getItem("formalities");
        if (storedFormalities) {
            setFormalities(JSON.parse(storedFormalities));
        }
    }, []);

    // Guardar datos en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem("formalities", JSON.stringify(formalities));
    }, [formalities]);

    // Manejar la adición de un nuevo formalitie
    const handleAddFormalitie = () => {
        if (newFormalitie.motive && newFormalitie.startDate && newFormalitie.endDate) {
            const updatedFormalities = [...formalities, newFormalitie];
            setFormalities(updatedFormalities);
            setNewFormalitie({ type: "Baja", motive: "", startDate: "", endDate: "" });
        }
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewFormalitie((prev) => ({ ...prev, [name]: value }));
    };

    const getTypeColor = (type: FormalitieType): string => {
        switch (type) {
            case "Baja":
                return "#FB9318";
            case "Ausencia":
                return "#9B2BC7";
            default:
                return "#000000";
        }
    };

    // Renderizar el componente
    return (
        <div>
            <NavigationTab />
            <RigthMenu />
            <div className="formalities__content">
                <div className="formalities__mobile">

                </div>

                <div className="formalities_desktop">
                    <div className="formalities__makeForm">
                        <div className="formalities__form">
                            <div className="formalitiesForm__title">
                                <h2>Trámites</h2>
                            </div>
                            <label>
                                <p>Tipo</p>
                                <select name="type" value={newFormalitie.type} onChange={handleChange}>
                                    <option value="Baja">Baja</option>
                                    <option value="Ausencia">Ausencia</option>
                                </select>
                            </label>
                            <label>
                                <p>Motivo</p>
                                <input
                                    type="text"
                                    name="motive"
                                    value={newFormalitie.motive}
                                    onChange={handleChange}
                                    placeholder="Escribe aquí tu motivo"
                                />
                            </label>
                            <label>
                                <p>Fecha inicio</p>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newFormalitie.startDate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                <p>Fecha fin</p>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newFormalitie.endDate}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button className="formalities__button" onClick={handleAddFormalitie}>
                            Añadir
                        </button>
                    </div>

                    <div className="formalities__info">
                        <div className="formalitiesInfo__title">
                            <h2>Tus Trámites</h2>
                        </div>
                        {formalities.map((formalitie, index) => (
                            <div key={index} className="formalities__data">
                                <LuBellRing style={{ color: getTypeColor(formalitie.type) }} />
                                <span style={{ color: getTypeColor(formalitie.type) }}>{formalitie.type}</span>
                                <span>{formalitie.motive}</span>
                                <span>
                                    {`${new Date(formalitie.startDate).toLocaleDateString("es-ES")} - ${new Date(
                                        formalitie.endDate
                                    ).toLocaleDateString("es-ES")}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Formalities;
