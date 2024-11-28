import './HeaderStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faBell, faPenClip, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import MenuHeader from '../MenuHead/MenuHead';


function Header() {

    return (
        <div className='header'>
            <div className="headerIconsContainer">
                <a href='/Home'><FontAwesomeIcon className='headerIcon' icon={faCalendar} /></a>
                <a href="http://"><FontAwesomeIcon className='headerIcon' icon={faClock} /></a>
                <a href="http://"><FontAwesomeIcon className='headerIcon' icon={faBell} /></a>
                <a href="http://"><FontAwesomeIcon className='headerIcon' icon={faPenClip} /></a>
                <a href="http://"><FontAwesomeIcon className='headerIcon' icon={faHelmetSafety} /></a>
            </div>
            <MenuHeader />
        </div>
    );
}

export default Header;