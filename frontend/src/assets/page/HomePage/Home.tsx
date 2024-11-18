import './HomeStyles.css';
import HomeCard from '../../componets/ComponentsHome/HomeCards/HomeCard';

function Home() {
    return (
        <>
            <div className="HomeContainer">
                <div className='imgDiv'></div>
                <HomeCard />

                {/* Botones provisionales */}
                <button><a href='/Course'> Boton cursos provisional</a></button>
                <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
            </div>
        </>
    );
}

export default Home;