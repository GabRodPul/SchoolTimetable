import React from 'react';
import { useState } from 'react';
import './GroupFormStyle.css'

function GroupForm() {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Código: ${codigo}\nDescripción: ${descripcion}`);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Formulario de Registro</h2>

                <label htmlFor="codigo">Código:</label>
                <input 
                    type="text" 
                    id="codigo" 
                    value={codigo} 
                    onChange={(e) => setCodigo(e.target.value)} 
                    required 
                />

                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                    id="descripcion" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)}
                    required 
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default GroupForm;