import __React from 'react';
import './HomeContentStyles.css'
import HomeCard from '../../Cards/HomeCards/HomeCard';


function HomeContent() {

    return (
        <div className='HomeContent'>
            <div className="HomeContent__Img1">
                <img src="/img/HomeDesk.png" alt="Descripción de la imagen" className='imgDesk' />
            </div>
            <div className="HomeContent__Img2">
                <img src="/img/FrontImg.png" alt="Descripción de la imagen" className='imgTablet' />
            </div>
            <div className="HomeContent__Cards">
                <HomeCard />
            </div>
        </div>
    );
}

export default HomeContent;