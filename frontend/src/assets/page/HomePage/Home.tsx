import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';
import './HomeStyles.css'
import Header from '#src/assets/componets/CommonComps/Header/Header';
import HeaderDesktop from '../../componets/CommonComps/HeaderDesktop/HeaderDesktop'
import SideMenu from '../../componets/CommonComps/SideMenu/SideMenu';
// Desktops
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';
import HomeContent from '#src/assets/componets/ComponentsHome/HomeContentDesktop/HomeContent';


function Home() {
    return (
        <>
            <div className="body">
                <div className='homepage__mobile'>
                    <Header />
                    <FrontImg />
                    <HomeCard />
                    <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
                </div>

                <div className='homepage__desktop'>
                    {/* <div className='homepage__sidemenu'>
                        <HeaderDesktop />
                    </div>
                    <div className='homepage__sidemenu'>
                        <SideMenu />
                    </div> */}
                    <div className='homepage_navigationTabs'>
                        <NavigationTabTeacher />
                    </div>
                    <div className="homepage__deskContent">
                        <HomeContent />
                    </div>
                    {/* Content */}
                </div>
            </div>
        </>
    );
}

export default Home;