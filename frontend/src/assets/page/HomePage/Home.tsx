import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';
import SideMenu from '#src/assets/componets/CommonComps/SideMenu/SideMenu';

function Home() {
    return (
        <>
            <div className="body">
                <div className='homepage__mobile'>
                    {/* <SideMenu/> */}
                    <FrontImg />
                    <HomeCard />
                    {/* Quitar luego, es solo para pruebas */}
                    <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
                </div>
            </div>
            <div className='homepage__desktop'>
                <SideMenu />
            </div>
        </>
    );
}

export default Home;