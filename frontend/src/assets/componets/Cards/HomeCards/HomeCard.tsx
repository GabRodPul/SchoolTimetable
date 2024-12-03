import './HomeCardStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faFilePen } from '@fortawesome/free-solid-svg-icons';

function HomeCard() {
    return (
        <div className='card__body'>

            <div className="card__content">
                <FontAwesomeIcon icon={faClock} />
                <h5 className='card__title'>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <a href="/timetable"><button>Acceder</button></a>
            </div>

            <div className="card__content">
                <FontAwesomeIcon icon={faBell} />
                <h5 className='card__title'>Página de Avisos</h5>
                <p>Vea sus avisos</p>
                <a href="/NoticesPage"><button>Acceder</button></a>
            </div>

            <div className="card__content">
                <FontAwesomeIcon icon={faFilePen} />
                <h5 className='card__title'>Página de Tramites</h5>
                <p>Vea sus tramites</p>
                <a href="http://"><button>Acceder</button></a>
            </div>
            
        </div>
    );
}

export default HomeCard;
