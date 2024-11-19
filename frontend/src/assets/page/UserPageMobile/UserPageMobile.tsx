import { FaUserCircle, } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { PiNotebookBold } from "react-icons/pi";
import { TbBellFilled } from "react-icons/tb";
import { MdOutlineLogin } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import './UserPageMobileStyles.css'


function UserPage() {
    return (
        <>
            <div className="UserPageContent">
                <div className="profile">
                    <h3 className="profile__title">Perfil</h3>
                    <div className="profile__card">
                        <FaUserCircle />
                        <div className="profile__cardInfo">
                            <p>Daniel</p>
                            <p>danieyzid@gmail.com</p>
                        </div>
                        <a href="/UserFormPage"><FaPen /></a>
                    </div>
                </div>
                <div className="options">
                    <h3 className="options__title">Opciones</h3>
                    <div className="options__card">
                        <FaUserCircle />
                        <div className="options__cardInfo">
                            <p>Mi Cuenta</p>
                            <p>Información de su perfil</p>
                        </div>
                        <IoIosArrowForward />
                    </div>

                    <div className="options__card">
                        <PiNotebookBold />
                        <div className="options__cardInfo">
                            <p>Mis Cursos</p>
                            <p>Acceda a la informacion de sus cursos</p>
                        </div>
                        <IoIosArrowForward />
                    </div>

                    <div className="options__card">
                        <TbBellFilled />
                        <div className="options__cardInfo">
                            <p>Notificaciones</p>
                            <p>Acceda a sus notifiaciones</p>
                        </div>
                        <IoIosArrowForward />

                    </div>

                    <div className="options__card">
                        <MdOutlineLogin />
                        <div className="options__cardInfo">
                            <p>Cierre sesión</p>
                            <p>Cierre sesión</p>
                        </div>
                        <IoIosArrowForward />
                    </div>
                </div>

            </div>
        </>
    );
}

export default UserPage;