import __React, { useEffect, useState } from 'react';
import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';
import './ProfilePageStyles.css'
//Mobile

//Desktop
import NavigationTabAdmin from '#src/assets/componets/CommonComps/navigationTab/Admin/NavigationTab';
import NavigationTabHeadOf from '#src/assets/componets/CommonComps/navigationTab/HeadOf/NavigationTab';
import NavigationTabStudent from '#src/assets/componets/CommonComps/navigationTab/Student/NavigationTab';
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';

function profile() {

    const [name, setname] = useState<string>(""); // Estado para el rol del usuario
    const [email, seteEmail] = useState<string>(""); // Estado para el rol del usuario
    const [phoneNumber, setPhoneNum] = useState<string>(""); // Estado para el rol del usuario
    const [role, setRole] = useState<string>(""); // Estado para el rol del usuario
    let roleText: string = ""

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
        if (authData) {
            setname(authData.user.name);
            seteEmail(authData.user.email);
            setPhoneNum(authData.user.phoneNumber);
            setRole(authData.user.role);
        } else {
            // console.warn('No se encontró un rol en localStorage');
            // setRole(""); // O manejarlo de otra forma
        }
    }, []);

    // Renderizar el contenido de la tarjeta según el rol
    const renderNavigationTab = () => {
        switch (role) {
            case UserRole.Admin:
                roleText = "Admin";
                return <NavigationTabAdmin />;
            case UserRole.Head:
                roleText = "Jefe de estudios";
                return <NavigationTabHeadOf />;
            case UserRole.Student:
                roleText = "Alumno";
                return <NavigationTabStudent />;
            case UserRole.Teacher:
                roleText = "Profesor";
                return <NavigationTabTeacher />;
            default:
                return <NavigationTabTeacher />;

        }
    };

    return (
        <>
            <div className="body">

                <div className='profilepage__desktop'>

                    <div className='P_navigationTabs'>
                        {renderNavigationTab()}
                    </div>

                    <div className="PflContent">
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
                                            <p>{roleText}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="userdata__form">
                                    <div className="form__userForm">
                                        <div className='userData__Tittle'>
                                            <p>Rol:</p>
                                        </div>
                                        <div className='userData__roleText'>
                                            <p>{roleText}</p>
                                        </div>
                                        <div className='userData__Tittle'>
                                            <p>Rol:</p>
                                        </div>
                                        <div className='userData__roleText'>
                                            <p>{roleText}</p>
                                        </div>
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
                        {/* Right Side Menu */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default profile;