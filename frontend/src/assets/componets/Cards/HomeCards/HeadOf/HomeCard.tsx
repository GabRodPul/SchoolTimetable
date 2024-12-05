import '../HomeCardStyles.css';
import { FaRegClock } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";

function HomeCard() {
    return (
        <div className='card__body'>

            <div className="card__content">
                <div className="card__icon">
                    <FaRegClock />
                </div>
                <div className="card__info">
                    <h5 className='card__title'>Página de Horarios</h5>
                    <p>Vea sus horarios</p>
                </div>
                <a href="/timetable"><button>Acceder</button></a>
            </div>

            <div className="card__content">
                <div className="card__icon">
                    <FaRegBell />
                </div>
                <div className="card__info">
                    <h5 className='card__title'>Página de Avisos</h5>
                    <p>Vea sus avisos</p>
                </div>
                <a href="/NoticesPage"><button>Acceder</button></a>
            </div>

            <div className="card__content">
                <div className="card__icon">
                    <HiMiniPencilSquare />
                </div>
                <div className="card__info">
                    <h5 className='card__title'>Página de Tramites</h5>
                    <p>Vea sus tramites</p>
                </div>
                <a href="http://"><button>Acceder</button></a>
            </div>

        </div>
    );
}

export default HomeCard;
