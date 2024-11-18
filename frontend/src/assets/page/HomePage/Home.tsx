import './HomeStyles.css';
import HomeCard from '../../componets/Cards/HomeCards/HomeCard';
import { useState } from 'react';

function Home() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <div className="HomeContainer">
                <div className='imgDiv'></div>
                <HomeCard />

                {/* Botones provisionales */}
                <button><a href='/Course'> Boton cursos provisional</a></button>
                <button><a href='/GroupPage'> Boton Grupos provisional</a></button>
            </div>

            <div
                className="HomeHelpIconContainer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="HomeHelpIcon">?</div>

                {isHovered && (
                    <div
                        className="HomeHelpToolTip"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p>¿Problemas con la aplicación?</p>
                        <button className="HomeContactButton">Contáctanos</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;