import './HomeCardStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faFilePen } from '@fortawesome/free-solid-svg-icons';

function HomeCard() {
    return (
        <div className='cards'>
            <div className="card">
                <FontAwesomeIcon icon={faClock} />
                <h5>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <a href="/timetable"><button>Acceder</button></a>
            </div>
            <div className="card">
                <FontAwesomeIcon icon={faBell} />
                <h5>Página de Avisos</h5>
                <p>Vea sus avisos</p>
                <a href="/NoticesPage"><button>Acceder</button></a>
            </div>
            <div className="card">
                <FontAwesomeIcon icon={faFilePen} />
                <h5>Página de Tramites</h5>
                <p>Vea sus tramites</p>
                <a href="http://"><button>Acceder</button></a>
            </div>
        </div>
    );
}

export default HomeCard;
