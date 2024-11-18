import Footer from '../../componets/ComponentsHome/Footer/Footer';
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/ComponentsHome/HomeCards/HomeCard';
import Header from './assets/componets/CommonComponets/Header/Header'

function Home() {
    return (
        <>

        <div className="body">
            <FrontImg/>
            <HomeCard/>
            {/* Quitar luego, es solo para pruebas */}
            <button><a href='/Course'> Boton cursos provisional</a></button>
            <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
            <Footer/>
        </div>
        </>
    );
}

export default Home;