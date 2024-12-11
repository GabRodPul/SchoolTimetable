import __React, { useEffect, useState } from 'react';
import { AuthData, UserData } from "#common/@types/models";
import './ProfilePageStyles.css'
import { useNavigate } from 'react-router-dom';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';

//Mobile
import { CiEdit, CiMenuKebab } from "react-icons/ci";

//Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import { UserRole } from '#common/@enums/models';

function profile() {

    const navigate = useNavigate();
    const [fetchRsrc, api] = useApi<UserData>(ApiRts.Users)
    const [userData, setUserData] = useState<UserData>(
        {
            email: "",
            name: "",
            password: "",
            phoneNumber: "",
            role: UserRole.Student,
            image: undefined
        }
    );

    useEffect(() => {
        switch (fetchRsrc.state) {
            case FetchState.NotStarted:
                //Sacar el usuario del local storage, como dato json, todos los valores
                const authData = JSON.parse(localStorage.getItem("currentUser")!) as any;
                //*console log de comprobacion
                console.log("AuthData:", authData);
                //buscando el usuario en la base de datos
                api.get(authData);
                break;

            case FetchState.Loading:
                break;

            case FetchState.Success:
                // Sacar nombre para buscar el usuario:
                const nameUser = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.name;
                console.log("NombreUser:", nameUser);

                //*console log de comprobacion
                console.log("Hoa:", fetchRsrc.data);

                //!Fallo
                if ("name" in fetchRsrc.data) {
                    //cambiamos los valores
                    setUserData(fetchRsrc.data as UserData);
                }

                break;

            default:
                break;
        }
    }, [fetchRsrc]);


    const roleTextInfo = () => {
        switch (userData.role) {
            case 'UR0_STUDENT': return 'Estudiante';
            case 'UR1_TEACHER': return 'Profesor';
            case 'UR2_HEAD': return 'Jefe de estudios';
            case 'UR3_ADMIN': return 'Admin';
            default: return '';
        }
    };

    const [isMenuOpenProfile, setIsMenuOpen1] = useState(false);
    const [isMenuOpenCourses, setIsMenuOpen2] = useState(false);
    const [isMenuOpenNotices, setIsMenuOpen3] = useState(false);

    const toggleMenu1 = () => {
        setIsMenuOpen1(!isMenuOpenProfile);;
    };
    const toggleMenu2 = () => {
        setIsMenuOpen2(!isMenuOpenCourses);;
    };
    const toggleMenu3 = () => {
        setIsMenuOpen3(!isMenuOpenNotices);;
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <>
            <div className="body">
                {/* Mobile */}

                <div className="profilepage__mobile">
                    <Header />
                    {/* Tarjeta de Perfil */}
                    <div className="mobile__content">
                        <div className="mobile__header">
                            <h2 className='Mobile__Title'>Perfil</h2>
                            <div className="ProfileCard__mobileCard">
                                <div className="mobilecardInfo">
                                    <div className="mobileCard__icon">
                                        {/* imagen */}
                                        <img src="./img/abstract-user-flat-4.png" alt="Imagen de perfil" />
                                    </div>
                                    <div className="mobileCard__info">
                                        <div className="MobileInfo__name">
                                            {/* name */}
                                            <div className='nameUser_mobile'>
                                                {userData.name}
                                            </div>
                                        </div>
                                        <div className="mobileInfo_email">
                                            {/* email */}
                                            <div className='emailUser_mobile'>
                                                {userData.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="iconMobile">
                                    <CiEdit color='white' size={30} />
                                </div>
                            </div>
                        </div>

                        {/* Opciones */}
                        <div className="mobile__options">
                            <div className="options__card">
                                <h2 className='Mobile__Title'>Opciones</h2>
                                <div className="mobileProfile__options">
                                    <h4>Mi perfil</h4>
                                    <CiMenuKebab
                                        onClick={toggleMenu1}
                                        className="menu-icon"
                                    />
                                </div>
                                {isMenuOpenProfile && (
                                    <div className="dropdown__menuMobile">
                                        <div className="dropdown__Info">
                                            <div className='mobileTittle'>
                                                <p>Nombre:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>{userData.name}</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Email:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>{userData.email}</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Teléfono:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>{userData.phoneNumber}</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Rol:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>{roleTextInfo()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mobileProfile__options">
                                    <h4>Mis Cursos</h4>
                                    <CiMenuKebab
                                        onClick={toggleMenu2}
                                        className="menu-icon"
                                    />
                                </div>
                                {isMenuOpenCourses && (
                                    <div className="dropdown__menuMobile">
                                        <div className="dropdown__Info">
                                            <div className='mobileTittle'>
                                                <p className='modulesInfo'>Segundo Desarrollo de aplicaciones web - Turno de tarde</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mobileProfile__options">
                                    <h4>Mis Notificaciones</h4>
                                    <CiMenuKebab
                                        onClick={toggleMenu3}
                                        className="menu-icon"
                                    />
                                </div>
                                {isMenuOpenNotices && (
                                    <div className="dropdown__menuMobile">
                                    </div>
                                )}

                                <div className="mobileProfile__options">
                                    <h4>Cambiar de Rol</h4>
                                </div>
                            </div>
                        </div>
                        {/* Botón de Cierre de Sesión */}
                        <button className="logoutButton" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
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
                                            {userData.name}
                                        </div>
                                    </div>
                                    <div className="Info_email">
                                        {/* email */}
                                        <div className='emailUser'>
                                            {userData.email}
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
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Email:</p>
                                            </div>
                                            <div className='userData__email'>
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Teléfono:</p>
                                            </div>
                                            <div className='userData__phone'>
                                                <p>{userData.phoneNumber}</p>
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
                                    <div className="info__ModulesData">
                                        <div className='ModulesData__Tittle'>
                                            <p>Impartiendo:</p>
                                        </div>
                                        <div className='ModulesData__name'>
                                            <p>Segundo Desarrollo de aplicaciones web - Turno de tarde</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="P_rightsidemenu">
                            <RigthMenu />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default profile;