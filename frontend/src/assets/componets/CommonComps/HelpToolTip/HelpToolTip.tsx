import _React from 'react';
import { useState } from 'react';
import './HelpToolTipStyles.css'

function HelpToolTip() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="HomeHelpIconContainer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="HomeHelpIcon">?</div>

            {isHovered && (
                <div className="HomeHelpToolTip"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>

                    <p>¿Problemas con la aplicación?</p>

                    <button className="HomeContactButton">Contáctanos</button>
                </div>
            )}
        </div>
    );
}

export default HelpToolTip;