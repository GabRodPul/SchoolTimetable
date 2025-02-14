import React, { useState, useEffect } from "react";
import { useApi } from "#src/api/ApiContext";
import { FetchState } from "#src/types/api";
import { ApiRts } from "#common/@enums/http";
import AdminModal from "../AdminComps/ModalForm"; // Asegúrate de importar el modal
import { AiOutlinePlus } from "react-icons/ai";

export type AdminListProps<T> = {
  buttonName: string;
  fields: (keyof T)[]; // Definir las propiedades de la entidad
  route: ApiRts; // Definir la ruta de la API
  FormComponent: React.FC; // El componente de formulario que se usará en el modal
};

export function AdminList<T>(props: AdminListProps<T>) {
  const [fetchData, api] = useApi<T>(props.route);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  useEffect(() => {
    if (fetchData.state === FetchState.NotStarted) api.getAll();
  }, []);

  return (
    <div className="userlist">
      <table className="userlist__usertable">
        <thead>
          <tr>
            {props.fields.map((f) => {
              const firstLetter = (f as string)[0].toUpperCase();
              const rest = (f as string).substring(1);
              return <th key={f as string}>{firstLetter + rest}</th>;
            })}
            <th>
              <button className="userlist__addbtn" onClick={() => setIsModalOpen(true)}>
                <AiOutlinePlus /> Añadir {props.buttonName}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fetchData.state === FetchState.SuccessMany &&
            Array.isArray(fetchData.data) &&
            fetchData.data.map((d: T, index) => (
              <tr key={index}>
                {props.fields.map((f) => <td key={f as string}>{d[f] as string}</td>)}
                <td>
                  <button className="userlist__editbtn" onClick={() => {
                    setSelectedItem(d);
                    setIsModalOpen(true);
                  }}>
                    ✏️ Editar
                  </button>
                  <button className="userlist__deletebtn">🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <AdminModal<T>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
        onCreate={(formState) => {/* lógica para crear */}}
        onUpdate={(formState) => {/* lógica para actualizar */}}
      >
        <props.FormComponent /> {/* El formulario dinámico */}
      </AdminModal>
    </div>
  );
}
