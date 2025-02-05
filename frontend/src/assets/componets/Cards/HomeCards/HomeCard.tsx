import './HomeCardStyles.css';
import { FaRegClock } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { AuthData } from '#common/@types/models';
import HomeCardsComp from './HomeCardsComp';
import { UserRole } from '#common/@enums/models';
import i18n from '#src/i18n';

function HomeCard() {
  const role = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user.role; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
  const { t } = i18n;

  return (
    <div className='card__body'>      
      <HomeCardsComp 
        icon={FaRegClock}
        title={t("pages.HomePage.cards.timetable.title")}
        description={t("pages.HomePage.cards.timetable.description")}
        route="/timetable"
        role={UserRole.Student}
      />
      
      <HomeCardsComp 
        icon={FaRegBell}
        title={t("pages.HomePage.cards.notices.title")}
        description={t("pages.HomePage.cards.notices.description")}
        route="/notices"
        role={UserRole.Student}
      />

      <HomeCardsComp 
        icon={HiMiniPencilSquare}
        title={t("pages.HomePage.cards.formalities.title")}
        description={t("pages.HomePage.cards.formalities.description")}
        route="/formalities"
        role={UserRole.Teacher}
      />
      <HomeCardsComp 
        icon={FaGear}
        title={t("pages.HomePage.cards.admin.title")}
        description={t("pages.HomePage.cards.admin.description")}
        route="/admin"
        role={UserRole.Admin}
      /> 

    </div>
  );
}

export default HomeCard;
