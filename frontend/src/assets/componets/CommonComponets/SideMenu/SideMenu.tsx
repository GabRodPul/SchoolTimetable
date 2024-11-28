import './SideMenuStyles.css'


function SideMenu() {

    return (
        <div className='header'>
            <div className="dropdown-menu">
                <button>Inicio</button>
                <button>Horarios</button>
                <button>Notificaciones</button>
                <button>Trámites</button>
                <button>Contacto</button>
            </div>
        </div>
    );
}

export default SideMenu;