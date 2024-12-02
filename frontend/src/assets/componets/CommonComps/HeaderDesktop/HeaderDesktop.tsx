import React, { useState } from 'react';
import './HeaderDesktopStyles.css';

function HeaderDesktop() {
    return (
        // Añadir
        // <UserImg />
        <div className='profile'>
            <div className='profile__Info'>
                <div className='profile__Icon'>
                    <img src="./img/userExample.png" alt="Imagen de perfil" />
                </div>
                <p className="profile__Name">Daniel Matias</p>
            </div>
        </div>
    );
};
export default HeaderDesktop;
