import './HomeCardStyles.css';
import { FaRegClock } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { AuthData } from '#common/@types/models';
import HomeCardsComp from './HomeCardsComp';
import { UserRole } from '#common/@enums/models';

function HomeCard() {
  const role = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

  return (
    <div className='card__body'>      
      <HomeCardsComp 
        icon={FaRegClock}
        title="Página de Horarios"
        description="Vea sus horarios"
        route="/timetable"
        role={UserRole.Student}
      />
      
      <HomeCardsComp 
        icon={FaRegBell}
        title="Página de Avisos"
        description="Vea sus avisos"
        route="/notices"
        role={UserRole.Student}
      />

      <HomeCardsComp 
        icon={HiMiniPencilSquare}
        title="Página de Tramites"
        description="Vea sus tramites"
        route="/formalities"
        role={UserRole.Teacher}
      />
      <HomeCardsComp 
        icon={FaGear}
        title="Configuración"
        description="Configuración de la app"
        route="/admin"
        role={UserRole.Admin}
      /> 

    </div>
  );
}

export default HomeCard;
