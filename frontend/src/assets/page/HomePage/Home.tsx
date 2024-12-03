import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';
import './HomeStyles.css'
import Header from '#src/assets/componets/CommonComps/Header/Header';
// Desktops
import NavigationTabTeacher from '#src/assets/componets/CommonComps/navigationTab/Teacher/NavigationTab';
import NavigationTabAdmin from '#src/assets/componets/CommonComps/navigationTab/Admin/NavigationTab';
import HomeContent from '#src/assets/componets/ComponentsHome/HomeContentDesktop/HomeContent';


function Home() {
    return (
        <>
            <div className="body">
                <div className='homepage__mobile'>
                    <Header />
                    <FrontImg />
                    <HomeCard />
                </div>

                <div className='homepage__desktop'>
                    <div className='homepage_navigationTabs'>
                        {/* <NavigationTabTeacher /> */}
                        <NavigationTabAdmin/>
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