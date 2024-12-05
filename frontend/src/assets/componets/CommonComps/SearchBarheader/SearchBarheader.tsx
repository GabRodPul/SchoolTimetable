import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Importamos el icono de búsqueda

import './SearchBarheaderStyles.css'; // Importamos el archivo CSS
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    function usePageTitle() {
        const location = useLocation();
        switch (location.pathname) {
            case '/notificaciones':
                return "Buscar Notificación";
            case '/tramites':
                return "Buscar Trámite";
            default:
                return 'Página Desconocida';
        }
    }
    return (
        <div className="search-bar">
            <FiSearch className="search-icon" size={20} /> {/* Icono de búsqueda */}
            <input
                type="text"
                placeholder= {usePageTitle()}
                className="search-input"
            />
        </div>
        
    );
};

export default SearchBar;