import __React, { useEffect, useState } from 'react';
import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';
import './HomeStyles.css'

//Mobile
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import HomeCardAdmin from '../../componets/Cards/HomeCards/Admin/HomeCard';
import HomeCardHeadOf from '../../componets/Cards/HomeCards/HeadOf/HomeCard';
import HomeCardStudent from '../../componets/Cards/HomeCards/Student/HomeCard';
import HomeCardTeacher from '../../componets/Cards/HomeCards/Teacher/HomeCard';

// Desktops
import HomeContent from '#src/assets/componets/ComponentsHome/HomeContentDesktop/HomeContent';
import NavigationTabAdmin from '#src/assets/componets/CommonComps/navigationTab/Admin/NavigationTab';
import NavigationTabHeadOf from '#src/assets/componets/CommonComps/navigationTab/HeadOf/NavigationTab';
import NavigationTabStudent from '#src/assets/componets/CommonComps/navigationTab/Student/NavigationTab';
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';
import _SearchBar from '#src/assets/componets/CommonComps/SearchBarheader/SearchBarheader';

function Home() {

        const role = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role; // Cambia 'currentuser' al nombre de la clave que usas en localStorage


    // Renderizar el componente de navegación según el rol
    const renderHomeCard = () => {
        switch (role) {
            case UserRole.Admin:
                return <HomeCardAdmin />;
            case UserRole.Head:
                return <HomeCardHeadOf />;
            case UserRole.Student:
                return <HomeCardStudent />;
            case UserRole.Teacher:
                return <HomeCardTeacher />;
            default:
                return <div>Error</div>;
        }
    };

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
                return <div>Error</div>;
        }
    };


    return (
        <>
            <div className="body">
                <div className="homepage__mobile">
                    <Header />
                    <FrontImg />
                    {renderHomeCard()}
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