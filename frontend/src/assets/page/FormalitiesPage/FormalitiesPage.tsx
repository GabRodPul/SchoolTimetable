import React from 'react';
import './FormalitiesPageStyles.css';

//Mobile
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import FormalitiesMobile from '#src/assets/componets/FormalitiesComps/Mobile/FormalitiesMobile';
//Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import FormalitiesDesktop from '#src/assets/componets/FormalitiesComps/Desktop/FormalitiesDesktop';

const Formalities: React.FC = () => {
    return (
        <div className='body'>
            <div className="mobile">
                <Header />
                <FormalitiesMobile />
            </div>
            <div className="desktop">
                <NavigationTab />
                <RigthMenu />
                <FormalitiesDesktop />
            </div>
        </div>
    );
};

export default Formalities;
