import __React, { useEffect, useState } from 'react';
import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';
import './HomeContentStyles.css'
import HomeCardAdmin from '../../Cards/HomeCards/Admin/HomeCard';
import HomeCardHeadOf from '../../Cards/HomeCards/HeadOf/HomeCard';
import HomeCardStudent from '../../Cards/HomeCards/Student/HomeCard';
import HomeCardTeacher from '../../Cards/HomeCards/Teacher/HomeCard';

function HomeContent() {
    const [role, setRole] = useState<string>(""); // Estado para el rol del usuario

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('currentuser') ?? "null") as AuthData; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
        if (authData) {
            setRole(authData.user.role);
        } else {
            console.warn('No se encontró un rol en localStorage');
            setRole(""); // O manejarlo de otra forma
        }
    }, []);

    // Renderizar el componente de navegación según el rol
    const renderHomeCard = () => {
        switch (role) {
            case UserRole.Admin:
                return <HomeCardAdmin />;
            case UserRole.Head:
                return <HomeCardHeadOf />;
            case UserRole.Student:
                return <HomeCardStudent />;
            case UserRole.Teacher:
                return <HomeCardTeacher />;
            default:
                return <HomeCardStudent />;
        }
    };

    return (
        <div className='HomeContent'>
            <div className="HomeContent__Img1">
                <img src="/img/HomeDesk.png" alt="Descripción de la imagen" className='imgDesk' />
            </div>
            <div className="HomeContent__Img2">
                <img src="/img/FrontImg.png" alt="Descripción de la imagen" className='imgTablet' />
            </div>
            <div className="HomeContent__Cards">
                {renderHomeCard()}
            </div>
        </div>
    );
}

export default HomeContent;