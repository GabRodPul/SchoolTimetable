import './HomeCardStyles.css';
import { FaRegClock } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { AuthData } from '#common/@types/models';

function HomeCard() {
  const role = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

  return (
    <div className='card__body'>

      <div className="card__content">
        <div className="card__icon">
          <FaRegClock />
        </div>
        <div className="card__info">
          <p className='card__title'>Página de Horarios</p>
          <p>Vea sus horarios</p>
        </div>
        <a href="/timetable"><button>Acceder</button></a>
      </div>

      <div className="card__content">
        <div className="card__icon">
          <FaRegBell />
        </div>
        <div className="card__info">
          <p className='card__title'>Página de Avisos</p>
          <p>Vea sus avisos</p>
        </div>
        <a href="/notices"><button>Acceder</button></a>
      </div>

      <div className='options_HomeCard'>
        {role != 'UR0_STUDENT' &&
          <div className='card__content'>
            <div className="card__icon">
              <HiMiniPencilSquare />
            </div>
            <div className="card__info">
              <p className='card__title'>Página de Tramites</p>
              <p>Vea sus tramites</p>
            </div>
            <a href="/formalities"><button>Acceder</button></a>
          </div>
        }
      </div>
      <div className='options_HomeCard'>
        {role == 'UR3_ADMIN' &&
          <div className='card__content'>
            <div className="card__icon">
              <FaGear />
            </div>
            <div className="card__info">
              <p className='card__title'>Configuración</p>
              <p>Configuración de la app</p>
            </div>
            <a href="/admin"><button>Acceder</button></a>
          </div>
        }
      </div>

    </div>
  );
}

export default HomeCard;
