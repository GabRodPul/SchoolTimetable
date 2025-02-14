import React, { useEffect, useState } from "react";
import { useApi } from "#src/api/ApiContext";
import { ApiRts } from "#common/@enums/http";
import { FetchState } from "#src/types/api";
import { AiOutlinePlus } from 'react-icons/ai';
import './UserList.css';
import AdminModal from "../AdminComps/ModalForm";
import { UserData, Id } from "#common/@types/models";

export type AdminListProps<T> = {
  buttonName: string;
  fields: (keyof T)[];
  route: ApiRts;
  FormComponent: React.FC;
};

export function AdminList<T extends UserData & Id>(props: AdminListProps<T>) {
  const [fetchData, api] = useApi<T>(props.route);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<T | null>(null);

  useEffect(() => {
    if (fetchData.state === FetchState.NotStarted) api.getAll();
  }, []);

  const handleCreate = (formState: T) => {
    api.post(formState).then(() => {
      api.getAll();
    }).catch((error) => {
      console.error("Error creating user:", error);
      alert("Ocurrió un error al crear usuario. Por favor, inténtelo de nuevo.");
    });
  };

  const handleUpdate = (formState: T) => {
    if (!selectedUser) return;
    api.put({ id: selectedUser.id, body: formState }).then(() => {
      setSelectedUser(null);
      api.getAll();
    }).catch((error) => {
      console.error("Error updating user:", error);
      alert("Ocurrió un error al actualizar usuario. Por favor, inténtelo de nuevo.");
    });
  };

  const handleDelete = (id: Id) => {
    api.delete(id).then(() => {
      api.getAll();
    }).catch((error) => {
      console.error("Error deleting user:", error);
      alert("Ocurrió un error al eliminar usuario. Por favor, inténtelo de nuevo.");
    });
  };

  const handleEdit = (user: T) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="userlist">
      <table className="userlist__usertable">
        <thead>
          <tr>
            {props.fields.map(f => {
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
                {props.fields.map(f => <td key={f as string}>{d[f] as string}</td>)}
                <td>
                  <button className="userlist__editbtn" onClick={() => handleEdit(d)}>✏️ Editar</button>
                  {/* <button className="userlist__deletebtn" onClick={() => handleDelete(d.id)}>🗑️ Eliminar</button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <props.FormComponent
          selectedUser={selectedUser}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      </AdminModal>
    </div>
  );
}
