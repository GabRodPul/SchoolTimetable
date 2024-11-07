import Header from '../../componets/CommonComponets/Header/Header';
import Footer from '../../componets/ComponentsHome/Footer/Footer';
import FrontImg from '../../componets/ComponentsHome/FrontImg/FrontIng';
import HomeCard from '../../componets/ComponentsHome/HomeCards/HomeCard';

function Home() {
    return (
        <div className="body">
            <Header/>
            <FrontImg/>
            <HomeCard/>
            {/* Quitar luego, es solo para pruebas */}
            <button><a href='/Course'> Boton cursos provisional</a></button>
            <Footer/>
        </div>
    );
}

export default Home;