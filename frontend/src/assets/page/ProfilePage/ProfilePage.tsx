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
                    <div className='profilepage_navigationTabs'>
                        {renderNavigationTab()}
                    </div>
                    {/* Content */}
                </div>
            </div>
        </>
    );
}

export default profile;