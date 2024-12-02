import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';
import SideMenu from '../../componets/CommonComps/SideMenu/SideMenu';
import './HomeStyles.css'
import Header from '#src/assets/componets/CommonComps/Header/Header';

function Home() {
    return (
        <>
            <div className="body">
                <div className='homepage__mobile'>
                    <Header/>
                    <FrontImg />
                    <HomeCard />
                    <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
                </div>

                <div className='homepage__desktop'>
                    <SideMenu />
                </div>
            </div>
        </>
    );
}

export default Home;