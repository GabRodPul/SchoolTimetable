import './HomeContentStyles.css'
import HomeCard from '../../Cards/HomeCards/HomeCard';

function HomeContent() {
    return (
        <div className='HomeContent'>
            <div className="HomeContent__Img">
                <img src="/img/HomeDesk.png" alt="Descripción de la imagen" />
            </div>
            <div className="HomeContent__Cards">
                <HomeCard />
            </div>
        </div>
    );
}

export default HomeContent;