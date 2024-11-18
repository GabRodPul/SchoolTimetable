import './HeaderStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import MenuHeader from '../MenuHead/MenuHead';


function Header() {

    return (
        <div className='header'>
            <a href='/Home'><FontAwesomeIcon icon={faCalendar} /></a>
            <MenuHeader/>
        </div>
    );
}

export default Header;