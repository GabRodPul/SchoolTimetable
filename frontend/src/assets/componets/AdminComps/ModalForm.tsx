import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./FormModalStyles.css";

// Usamos un tipo genérico T para que el modal pueda manejar cualquier tipo de entidad
type AdminModalProps<T> = {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: T | null;
  onCreate: (formState: T) => void;
  onUpdate: (formState: T) => void;
  children: React.ReactNode; // Esto mantendrá el contenido dinámico del formulario
};

const AdminModal = <T,>({
  isOpen,
  onClose,
  selectedItem,
  onCreate,
  onUpdate,
  children
}: AdminModalProps<T>) => {
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default AdminModal;
