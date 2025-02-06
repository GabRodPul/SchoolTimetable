import { UserRole } from '#common/@enums/models';
import { AuthData } from '#common/@types/models';
import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type NavProps = {
    route: string,
    name: string,
    icon: IconType,
    role: UserRole,
    className:string
}

function NavItem(props: NavProps) {
    const { role, name } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

    return (
        <div>
            { role >= props.role &&
                < Link className='navigationLink' to={props.route}>
                    <button className={`navigationTab__side-menuButton ${location.pathname === props.route ? "active" : ""}`}>
                        <props.icon className={props.className} size={30}/> 
                        {props.name}
                    </button>
                </Link>
            }

        </div>
    );
}

export default NavItem;