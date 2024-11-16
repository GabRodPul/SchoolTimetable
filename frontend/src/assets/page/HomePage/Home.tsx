import './HomeStyles.css'
import HomeCard from '../../componets/ComponentsHome/HomeCards/HomeCard';

function Home() {
    return (
        <>
            <div className="body">
                <div className='imgDiv'>
                    <img src="/img/FrontImg.png" alt="foto" />
                </div>


                <HomeCard />

                
                {/* Quitar luego, es solo para pruebas */}
                <button><a href='/Course'> Boton cursos provisional</a></button>
                <button><a href='/GroupPage'> Boton Grupos provisional</a></button>


                <div className='footer'>
                    <p>¿Problemas con la aplicación?</p>
                    <button>Contáctanos</button>
                </div>
            </div>
        </>
    );
}

export default Home;