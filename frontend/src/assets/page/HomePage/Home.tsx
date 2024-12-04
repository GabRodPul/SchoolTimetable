import __React, { useEffect, useState } from 'react';
import './HomeStyles.css'

//Mobile
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import Header from '#src/assets/componets/CommonComps/Header/Header';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';

// Desktops
import HomeContent from '#src/assets/componets/ComponentsHome/HomeContentDesktop/HomeContent';
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';
import NavigationTabAdmin from '#src/assets/componets/CommonComps/navigationTab/Admin/NavigationTab';
import NavigationTabHeadOf from '#src/assets/componets/CommonComps/navigationTab/HeadOf/NavigationTab';
import NavigationTabStudent from '#src/assets/componets/CommonComps/navigationTab/Student/NavigationTab';


function Home() {
    const [role, setRole] = useState<string | null>(null); // Estado para el rol del usuario

    useEffect(() => {
        const storedRole = localStorage.getItem('currentuser'); // Cambia 'userRole' al nombre de la clave que usas en localStorage
        if (storedRole) {
            setRole(storedRole);
        } else {
            console.warn('No se encontró un rol en localStorage');
            setRole(null); // O manejarlo de otra forma
        }
    }, []);

    // Renderizar el componente de navegación según el rol
    const renderNavigationTab = () => {
        switch (role) {
            case 'admin':
                return <NavigationTabAdmin />;
            case 'headof':
                return <NavigationTabHeadOf />;
            case 'teacher':
                return <NavigationTabTeacher />;
            case 'student':
                return <NavigationTabStudent />;
            default:
                return null; // O un componente de fallback si no hay rol
        }
    };

    return (
        <>
            <div className="body">
                <div className='homepage__mobile'>
                    <Header />
                    <FrontImg />
                    <HomeCard />
                </div>

                <div className='homepage__desktop'>
                    <div className='homepage_navigationTabs'>
                        {renderNavigationTab()}
                    </div>
                    <div className="homepage__deskContent">
                        <HomeContent />
                    </div>
                    {/* Content */}
                </div>
            </div>
        </>
    );
}

export default Home;