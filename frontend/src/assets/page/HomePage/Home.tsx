import __React from 'react';
import './HomeStyles.css'

//Mobile
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';


// Desktops
import HomeContent from '#src/assets/componets/ComponentsHome/HomeContentDesktop/HomeContent';
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';

function Home() {

    // Renderizar el componente de navegación según el rol
    return (
        <>
            <div className="body">
                <div className="homepage__mobile">
                    <Header />
                    <FrontImg />
                    <HomeCard />
                </div>

                <div className='homepage__desktop'>
                    <div className='homepage_navigationTabs'>
                        <NavigationTab />
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