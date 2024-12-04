import __React, { useEffect, useState } from 'react';
import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';

//Mobile

//Desktop
import NavigationTabAdmin from '#src/assets/componets/CommonComps/navigationTab/Admin/NavigationTab';
import NavigationTabHeadOf from '#src/assets/componets/CommonComps/navigationTab/HeadOf/NavigationTab';
import NavigationTabStudent from '#src/assets/componets/CommonComps/navigationTab/Student/NavigationTab';
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';

function profile() {

    const [role, setRole] = useState<string>(""); // Estado para el rol del usuario

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('currentuser') ?? "null") as AuthData; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
        if (authData) {
            setRole(authData.user.role);
        } else {
            console.warn('No se encontró un rol en localStorage');
            setRole(""); // O manejarlo de otra forma
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
                            </div>
                            <div className="ProfileCard__info">
                                <div className="Info__name">
                                    {/* name */}
                                </div>
                                <div className="Info_email">
                                    {/* email */}
                                </div>
                            </div>
                            {/* iconos si eso */}
                        </div>

                        <div className="PflContent__GeneralInfo">
                            <div className="generalInfo__title">

                            </div>

                            <div className="generalInfo__userdata">
                                <div className="userdata__Info">

                                </div>
                                <div className="userdata__form">

                                </div>
                            </div>

                            <div className="generalInfo__title">

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