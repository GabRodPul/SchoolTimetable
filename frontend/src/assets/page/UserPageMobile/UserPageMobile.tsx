import { FaUserCircle, } from "react-icons/fa";
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
                        <FaPen />
                    </div>
                </div>
                <div className="options">
                    <div className="option__card">
                        <FaUserCircle />
                    </div>
                    <div className="option__card">
                        <PiNotebookBold />
                    </div>
                    <div className="option__card">
                        <TbBellFilled />
                    </div>
                    <div className="option__card">
                        <MdOutlineLogin />
                    </div>
                </div>

            </div>
        </>
    );
}

export default UserPage;