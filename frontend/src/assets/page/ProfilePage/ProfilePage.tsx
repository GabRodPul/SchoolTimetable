import __React, { useState } from 'react';
// import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';
import './ProfilePageStyles.css'
//Mobile
import { CiEdit } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";

//Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';


function profile() {
    const name = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.name; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
    const email = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.email; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
    const phoneNumber = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.phoneNumber; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
    const role = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

    const roleTextInfo = () => {
        switch (role) {
            case 'UR0_STUDENT': return 'Estudiante';
            case 'UR1_TEACHER': return 'Profesor';
            case 'UR2_HEAD': return  'Jefe de estudios';
            case 'UR3_ADMIN': return  'Admin';
            default: '';
        }
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="body">
                {/* Mobile */}
                <Header />
                <div className="profilepage__mobile">
                    {/* Tarjeta de Perfil */}
                    <h2 className='PerfilMobile__Title'>Perfil</h2>
                    <div className="ProfileCard__mobileCard">
                        <div className="mobileCard__icon">
                            {/* imagen */}
                            <img src="./img/abstract-user-flat-4.png" alt="Imagen de perfil" />
                        </div>
                        <div className="mobileCard__info">
                            <div className="MobileInfo__name">
                                {/* name */}
                                <div className='nameUser_mobile'>
                                    {name}
                                </div>
                            </div>
                            <div className="mobileInfo_email">
                                {/* email */}
                                <div className='emailUser_mobile'>
                                    {email}
                                </div>
                            </div>
                        </div>
                        <div className="iconMobile">
                            <CiEdit color='white' size={30} />
                        </div>
                    </div>

                    {/* Opciones */}
                    <div className="mobile__options">
                        <h2 className='OptionsMobile__Title'>Opciones</h2>
                        <div className="mobileProfile__options">
                            <h4>Mi perfil</h4>
                            <CiMenuKebab
                                onClick={toggleMenu}
                                className="menu-icon"
                            />
                            {isMenuOpen && (
                                <p>{name}</p>
                            )}
                        </div>
                    </div>


                    {/* Botón de Cierre de Sesión */}
                    <button className="logoutButton">Cerrar Sesión</button>
                </div>
            </div>

            <div className='profilepage__desktop'>

                <div className='P_navigationTabs'>
                    <NavigationTab />
                </div>

                <div className="PflContent">
                    <div className="PflContent__Info">
                        <div className="PflContent__ProfileCard">
                            <div className="ProfileCard__icon">
                                {/* imagen */}
                                <img src="./img/abstract-user-flat-4.png" alt="Imagen de perfil" />
                            </div>
                            <div className="ProfileCard__info">
                                <div className="Info__name">
                                    {/* name */}
                                    <div className='nameUser'>
                                        {name}
                                    </div>
                                </div>
                                <div className="Info_email">
                                    {/* email */}
                                    <div className='emailUser'>
                                        {email}
                                    </div>
                                </div>
                            </div>
                            {/* iconos si eso */}
                        </div>

                        <div className="PflContent__GeneralInfo">
                            <div className="generalInfo__title">
                                <h3>Información general</h3>
                            </div>
                            <div className="generalInfo__titles">
                                <div className="titles_content">
                                    <div className="titles__data">
                                        <h5>Mis Datos</h5>
                                    </div>
                                    <div className="titles__edit">
                                        <h5>Editar Perfil</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="generalInfo__userdata">
                                <div className="userdata__Info">
                                    <div className="info__userData">
                                        <div className='userData__Tittle'>
                                            <p>Nombre:</p>
                                        </div>
                                        <div className='userData__name'>
                                            <p>{name}</p>
                                        </div>
                                    </div>

                                    <div className="info__userData">
                                        <div className='userData__Tittle'>
                                            <p>Email:</p>
                                        </div>
                                        <div className='userData__email'>
                                            <p>{email}</p>
                                        </div>
                                    </div>

                                    <div className="info__userData">
                                        <div className='userData__Tittle'>
                                            <p>Teléfono:</p>
                                        </div>
                                        <div className='userData__phone'>
                                            <p>{phoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="info__userData">
                                        <div className='userData__Tittle'>
                                            <p>Rol:</p>
                                        </div>
                                        <div className='userData__roleText'>
                                            <p>{roleTextInfo()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="userdata__form">
                                    <div className="form__userForm">
                                        <div className='userData__formTittle'>
                                            <p>Nombre:</p>
                                        </div>
                                        <div className='userData__formText'>
                                            <input type="text" placeholder='Cambie Su Nombre' />
                                        </div>
                                        <div className='userData__formTittle'>
                                            <p>Telefono:</p>
                                        </div>
                                        <div className='userData__formText'>
                                            <input type="text" placeholder='Cambie Su Teléfono' />
                                        </div>

                                        <button className='userData__formButton'>Confirmar:</button>
                                    </div>
                                </div>
                            </div>

                            <div className="generalInfo__title">
                                <h5>Mis Modulos</h5>
                            </div>

                            <div className="generalInfo__data">

                            </div>

                        </div>
                    </div>

                    <div className="P_rightsidemenu">
                        <RigthMenu />
                    </div>
                </div>

            </div>
        </>
    );
}

export default profile;