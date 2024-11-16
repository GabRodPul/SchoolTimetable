import React, { useState, FormEvent } from 'react';
import './CourseFormPageStyles.css';

const CourseFormPage: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [message, setMensaje] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (code.length <= 3 && descripcion.length <= 64) {
            setMensaje(`Curso añadido: ${code} - ${descripcion}`);
            setCode('');
            setDescripcion('');
        } else {
            setMensaje('Por favor, revisa los límites de caracteres.');
        }
    };

    return (
        <div className="CourseFormBody">
            <div className="form-container">
                <h2>Añadir Curso</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Código (máx. 3 caracteres):</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={3}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción (máx. 64 caracteres):</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            maxLength={64}
                            required
                        />
                    </div>
                    <button className='buttonForm' type="submit">Añadir Curso</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default CourseFormPage;