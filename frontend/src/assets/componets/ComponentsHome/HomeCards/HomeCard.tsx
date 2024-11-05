import './HomeCard.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@awesome.me/kit-KIT_CODE/icons/kit/custom'

function HomeCard() {
    return (
        <div className='cards'>
            <div className="card">
                <FontAwesomeIcon icon={faClock} />
                <h5>Página de Horarios</h5>
                <p>Vea sus horarios</p>
                <button>Acceder</button>
            </div>
        </div>
    );
}

export default HomeCard;