import './HomeCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faFilePen } from '@fortawesome/free-solid-svg-icons';

function HomeCard() {
    return (
        <div className='cards'>
            <div className="card">
                <FontAwesomeIcon icon={faClock} />
                <h5>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <button>Acceder</button>
            </div>
            <div className="card">
                <FontAwesomeIcon icon={faBell} />
                <h5>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <button>Acceder</button>
            </div>
            <div className="card">
                <FontAwesomeIcon icon={faFilePen} />
                <h5>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <button>Acceder</button>
            </div>
        </div>
    );
}

export default HomeCard;
