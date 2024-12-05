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
                return <NavigationTabAdmin />;
            case UserRole.Head:
                return <NavigationTabHeadOf />;
            case UserRole.Student:
                return <NavigationTabStudent />;
            case UserRole.Teacher:
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
                            <h3>Información general</h3>
                            <div className="generalInfo__title">
                                <div className="title__data">
                                    <h5>Mis Datos</h5>
                                </div>
                                <div className="title__edit">
                                    <h5>Editar Perfil</h5>
                                </div>
                            </div>

                            <div className="generalInfo__userdata">
                                <div className="userdata__Info">
                                    <div className='Info__nameUser'>
                                        {name}
                                    </div>
                                    <div className='Info__emailUser'>
                                        {email}
                                    </div>
                                    <div className='Info__phonelUser'>
                                        {phoneNumber}
                                    </div>
                                    <div className='Info__rolelUser'>
                                        {role}
                                    </div>
                                </div>
                                <div className="userdata__form">

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