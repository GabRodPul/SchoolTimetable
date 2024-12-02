import './SideMenuStyles.css'


function SideMenu() {

    return (
        <div className='header'>
            <div className="side-menu">
                <button>Menú</button>
                <button>Horarios</button>
                <button>Notificaciones</button>
                <button>Trámites</button>
                <button>Perfil</button>
            </div>
        <div className='side-menu__footer'>
            <button>Cerrar sesión</button>
        </div>
        </div>
    );
}

export default SideMenu;