import './SideMenuStyles.css'
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";

function SideMenu() {

    return (
        <div className='header'>
            <div className="side-menu__body">
                <a href=""> <button className='side-menu__header'> <RiHome2Line /> Menú </button> </a>
                <a href=""> <button className=' side-menu__content'> <RiCalendarScheduleLine /> Horarios  </button> </a>
                <a href=""> <button className=' side-menu__content'>  <LuBell /> Notificaciones</button> </a>
                <a href=""> <button className=' side-menu__content'>  <BsPencilSquare /> Trámites </button> </a>
                <a href=""> <button className=' side-menu__content'>  <FaRegUser /> Perfil </button> </a>
            </div>
            <div className='side-menu__footer'>
                <a href=""> <button className='side-menu__foot'> <MdOutlineLogin /> Cerrar sesión </button> </a>
            </div>
        </div>
    );
}

export default SideMenu;