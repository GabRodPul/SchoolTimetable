import { FaSearch } from "react-icons/fa";
import './NoticesPageStyles.css'
import NoticeCard from '../../componets/Cards/NoticeCard/NoticeCard'


function NoticesPage() {
    return (
        <div className='noticesContent'>

            <div className='searchContainer'>
                <label className="searchBar">
                    <div className='searchIcon'>
                    <FaSearch />
                    </div>
                    <input type="text" className="inputNotice"  placeholder='Buscar Notificación'/>
                </label>
            </div>
            <div className="notificationContainer">
                <NoticeCard />
                <NoticeCard />
            </div>
        </div>
    );
}

export default NoticesPage;