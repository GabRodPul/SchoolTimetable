import __React, { useEffect, useState } from 'react';
import { AuthData, Id, UserData } from "#common/@types/models";
import { useNavigate } from 'react-router-dom';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';
import { UserRole } from '#common/@enums/models';
import './ProfilePageStyles.css'

//Mobile
import { CiEdit, CiMenuKebab } from "react-icons/ci";

//Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';

type User = UserData & Id;
function profile() {

    const localEmail = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.email;
    const localName = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.name;
    const localPass = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.password;
    const localNumber = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.phoneNumber;
    const localRole = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role;
    const navigate = useNavigate();

    const [users, api] = useApi<User>(ApiRts.Users);
    const [formState, setFormState] = useState<User>({ id: 0, name: localName, email: localEmail, role: "", password: localPass, phoneNumber: localNumber });
    const [filtered, setFilteredUsers] = useState<User[]>([]); // Estado para usuarios filtrados
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Estado para el usuario actual

    console.log("Hola", (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData));

    useEffect(() => {
        api.getAll();
    }, []);

    useEffect(() => {
        console.log("Hola",localStorage.getItem('currentUser '));
        if (users.state === FetchState.Success && Array.isArray(users.data)) {
            const email = (JSON.parse(localStorage.getItem('currentUser ') ?? "null") as AuthData).user.email; // Obtener el email del localStorage
            const filtered = users.data.filter(user => user.email === email);
            console.log("Usuarios filtrados: ", filtered);
            setFilteredUsers(filtered);
            setCurrentUser(filtered[0] || null); // Establecer el primer usuario filtrado como el usuario actual
        }
    }, [users]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState: any) => ({ ...prevState, [name]: value }));
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
                                                {currentUser?.name}
                                            </div>
                                        </div>
                                        <div className="mobileInfo_email">
                                            {/* email */}
                                            <div className='emailUser_mobile'>
                                                a
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
                                                <p>a</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Email:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>a</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Teléfono:</p>
                                            </div>
                                            <div className='mobileData'>
                                                <p>a</p>
                                            </div>
                                            <div className='mobileTittle'>
                                                <p>Rol:</p>
                                            </div>
                                            <div className='mobileData'>
                                                {/* <p>{roleTextInfo()}</p> */}
                                                <p>a</p>
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
                                        {currentUser?.name}
                                        </div>
                                    </div>
                                    <div className="Info_email">
                                        {/* email */}
                                        <div className='emailUser'>
                                            a
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
                                                <p>a</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Email:</p>
                                            </div>
                                            <div className='userData__email'>
                                                <p>a</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Teléfono:</p>
                                            </div>
                                            <div className='userData__phone'>
                                                <p>a</p>
                                            </div>
                                        </div>

                                        <div className="info__userData">
                                            <div className='userData__Tittle'>
                                                <p>Rol:</p>
                                            </div>
                                            <div className='userData__roleText'>
                                                {/* <p>{roleTextInfo()}</p> */}
                                                <p>a</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userdata__form">
                                        <div className="form__userForm">
                                            <div className='userData__formTittle'>
                                                <p>Nombre:</p>
                                            </div>
                                            <div className='userData__formText'>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={formState.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='userData__formTittle'>
                                                <p>Telefono:</p>
                                            </div>
                                            <div className='userData__formText'>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={formState.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <button className='userData__formButton' >Confirmar:</button>
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