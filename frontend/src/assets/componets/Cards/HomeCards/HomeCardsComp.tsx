import React from 'react';
import { IconType } from 'react-icons';

type  HomeCardsCompProps = {
    icon: IconType,
    title: string,
    description: string,
    route: string,
    role: string
}

function HomeCardsComp(props: HomeCardsCompProps) {
    const { role, title } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage
    return (
        <div className='options_HomeCard'>
                {role >= props.role &&
                  <div className='card__content'>
                    <div className="card__icon">
                      <props.icon/>
                    </div>
                    <div className="card__info">
                      <p className='card__title'>{props.title}</p>
                      <p>{props.description}</p>
                    </div>
                    <a href={props.route}><button>Acceder</button></a>
                  </div>
                }
                </div>
    );
}

export default HomeCardsComp;