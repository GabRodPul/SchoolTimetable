import './HeaderStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <div className='header'>
            <FontAwesomeIcon icon={faCalendar} />
            <FontAwesomeIcon icon={faBars} />
        </div>
    );
}

export default Header;