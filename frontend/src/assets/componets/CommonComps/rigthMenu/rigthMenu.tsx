import React, { useEffect, useState } from "react";
import "./rigthMenuStyles.css";
import { LuBellRing } from "react-icons/lu";

type ReminderType = "Examen" | "Cambio de Hora" | "Tarea" | "Entrega";

interface Reminder {
  type: ReminderType;
  description: string;
  date: string;
}

const RigthMenu: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Reminder>({ type: "Examen", description: "", date: "", });

  // Recuperar recordatorios del localStorage al montar el componente
  useEffect(() => {
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders)); // Establece los recordatorios desde el localStorage
    }
  }, []);

  // Guardar los recordatorios en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = () => {
    if (newReminder.description && newReminder.date) {
      const updatedReminders = [...reminders, newReminder];
      setReminders(updatedReminders);
      setNewReminder({ type: "Examen", description: "", date: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  const getTypeColor = (type: ReminderType): string => {
    switch (type) {
      case "Examen":
        return "#FB9318";
      case "Cambio de Hora":
        return "#9B2BC7";
      case "Tarea":
        return "#30E578";
      case "Entrega":
        return "#4339F2";
      default:
        return "#000000";
    }
  };

  return (
    <div className="rigthMenu">
      <h3>Añadir recordatorio</h3>
      <div className="rigthMenu__form">
        <label>
          <p>Tipo</p>
          <select name="type" value={newReminder.type} onChange={handleChange}>
            <option value="Examen">Examen</option>
            <option value="Cambio de Hora">Cambio de Hora</option>
            <option value="Tarea">Tarea</option>
            <option value="Tarea">otra prueba</option>
            <option value="Entrega">Entrega</option>
          </select>
        </label>
        <label>
          <p>Descripción</p>
          <input type="text" name="description" value={newReminder.description} onChange={handleChange} placeholder="Escribe aquí tu recordatorio" />
        </label>
        <label>
          <p>Fecha</p>
          <input type="date" name="date" value={newReminder.date} onChange={handleChange} />
        </label>
      </div>
      <button className="rigthMenu__button" onClick={handleAddReminder}>Añadir</button>
      <div className="rigthMenu__reminders">
        <h3>Recordatorios</h3>
        {reminders.map((reminder, index) => (
          <div key={index} className="rigthMenu__reminder">
            {/* Icono y texto dinámicamente coloreados */}
            <LuBellRing style={{ color: getTypeColor(reminder.type) }} />
            <span style={{ color: getTypeColor(reminder.type) }}>
              {`${reminder.type} ${new Date(reminder.date).toLocaleDateString("es-ES")}`}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RigthMenu;
