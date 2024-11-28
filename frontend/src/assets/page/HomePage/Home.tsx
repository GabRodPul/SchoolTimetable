import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';

function Home() {
    return (
        <>
        <div className="body">
            <FrontImg/>
            <HomeCard/>
            {/* Quitar luego, es solo para pruebas */}
            <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
        </div>
        </>
    );
}

export default Home;