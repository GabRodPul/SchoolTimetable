import __React, { useEffect, useState } from 'react';
import { AuthData, Id } from "#common/@types/models";
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

function profile() {

    const [fetchRsrc, { getAll }] = useApi<AuthData & { id: number }>(ApiRts.Users);
    const [userData, setUserData] = useState<AuthData & { id: number } | null>(null);
    const [currentUserId, setCurrentUserId] = useState<{ id: number } | null>(null);  // Almacenamos el id por separado
    const [hasFetchedData, setHasFetchedData] = useState(false); // Control de si ya se hizo la llamada API
    const navigate = useNavigate();

    // Obtener el userId desde localStorage
    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem('currentUser') ?? '{}').user?.id;
        if (storedUserId) {
            setCurrentUserId(storedUserId); // Establecer el ID directamente
        }
    }, []);

    // // Este useEffect solo se ejecuta si `currentUserId` cambia y no hemos fetchado datos aún
    // useEffect(() => {
    //     if (currentUserId && !hasFetchedData) {
    //         const fetchUserData = async () => {
    //             try {
    //                 const data = await get(currentUserId); // Aquí get debería devolver los datos
    //                 console.log(data);
    //                 setUserData(data);  // Se actualiza el estado con los datos
    //                 setHasFetchedData(true); // Marcamos que los datos ya fueron obtenidos
    //             } catch (error) {
    //                 console.error('Error fetching user:', error);
    //             }
    //         };
    //         fetchUserData();
    //     }
    // }, [currentUserId, get, hasFetchedData]);

    useEffect(() => {
        if (currentUserId && !hasFetchedData) {
            const fetchUserData = async () => {
                try {
                    const users = await getAll();  // Obtener todos los usuarios
                    console.log(users); // Verifica que esta respuesta sea un array

                    // Filtra el usuario actual por ID
                    const currentUser = users?.find((user: { id: { id: number; }; }) => user.id === currentUserId);

                    if (currentUser) {
                        setUserData(currentUser);  // Actualizar el estado con los datos del usuario actual
                        setHasFetchedData(true);
                    } else {
                        console.error("Usuario no encontrado");
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUserData();
        }
    }, [currentUserId, getAll, hasFetchedData]);


    const roleTextInfo = () => {
        switch (userData?.user.role) {
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
                                            {userData?.user.name}
                                        </div>
                                    </div>
                                    <div className="mobileInfo_email">
                                        {/* email */}
                                        <div className='emailUser_mobile'>
                                            {userData?.user.email}
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
                                            <p>{userData?.user.name}</p>
                                        </div>
                                        <div className='mobileTittle'>
                                            <p>Email:</p>
                                        </div>
                                        <div className='mobileData'>
                                            <p>{userData?.user.email}</p>
                                        </div>
                                        <div className='mobileTittle'>
                                            <p>Teléfono:</p>
                                        </div>
                                        <div className='mobileData'>
                                            <p>{userData?.user.phoneNumber}</p>
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
                                            {userData?.user.name}
                                        </div>
                                    </div>
                                    <div className="Info_email">
                                        {/* email */}
                                        <div className='emailUser'>
                                            {userData?.user.email}
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
                                                <p>{userData?.user.name}</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Email:</p>
                                            </div>
                                            <div className='userData__email'>
                                                <p>{userData?.user.email}</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Teléfono:</p>
                                            </div>
                                            <div className='userData__phone'>
                                                <p>{userData?.user.phoneNumber}</p>
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