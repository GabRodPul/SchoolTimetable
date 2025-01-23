import __React, { useEffect, useState } from 'react';
import { AuthData, Id, UserData } from "#common/@types/models";
import { useNavigate } from 'react-router-dom';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';
import { UserRole } from '#common/@enums/models';
import './ProfilePageStyles.css'

//Mobile
import { CiEdit, CiMenuKebab } from "react-icons/ci";

//Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';

type User = UserData & Id;
function profile() {
  const navigate = useNavigate();


  const [users, api] = useApi<User>(ApiRts.Users);

  const [formState, setFormState] = useState<User>({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" });

  const [tempFormState, setTempFormState] = useState<User>({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" }); // Estado temporal

  const [filtered, setFilteredUsers] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);


  useEffect(() => {

    api.getAll();

  }, []);


  useEffect(() => {
    //Saco el email aquí
    const { email } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user;
    console.log("Email: ", email)
    if (users.state === FetchState.Success && Array.isArray(users.data)) {
      const filtered = users.data.filter(user => user.email === email);
      setFilteredUsers(filtered);
      setCurrentUser(filtered[0] || null);
      if (filtered.length > 0) {
        setTempFormState(filtered[0]); // Cargar datos del usuario seleccionado en el estado temporal
      }
    }
  }, [users]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFormState((prevState) => ({ ...prevState, [name]: value })); // Actualiza el estado temporal
  };

  const handleCreate = () => {
    // Implementar lógica de creación si es necesario
  };

  const handleUpdate = () => {
    // Implementar lógica de creación si es necesario
  };

  const handleEdit = () => {
    // Implementar lógica de creación si es necesario
  };

  const validateForm = () => {
    const { name, phoneNumber } = tempFormState; // Validar el estado temporal
    if (!name || !phoneNumber) {
      alert("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const [isMenuOpenProfile, setIsMenuOpen1] = useState(false);
  const [isMenuOpenCourses, setIsMenuOpen2] = useState(false);
  const [isMenuOpenNotices, setIsMenuOpen3] = useState(false);

  const toggleMenu1 = () => {
    setIsMenuOpen1(!isMenuOpenProfile);;
  };
  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpenCourses);;
  };
  const toggleMenu3 = () => {
    setIsMenuOpen3(!isMenuOpenNotices);;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <>
      <div className="body">
        {/* Mobile */}
        <div className="profilepage__mobile">
          <Header />
          <div className="mobile__content">
            <div className="mobile__header">
              <h2 className='Mobile__Title'>Perfil</h2>
              <div className="Profile Card__mobileCard">
                <div className="mobilecardInfo">
                  <div className="mobileCard__icon">
                    <img src="./img/abstract-user-flat-4.png" alt="Imagen de perfil" />
                  </div>
                  <div className="mobileCard__info">
                    <div className="MobileInfo__name">
                      <div className='nameUser _mobile'>
                        {currentUser?.name}
                      </div>
                    </div>
                    <div className="mobileInfo_email">
                      <div className='emailUser _mobile'>
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="iconMobile">
                  <CiEdit color='white' size={30} />
                </div>
              </div>
            </div>
            <div className="mobile__options">
              <div className="options__card">
                <h2 className='Mobile__Title'>Opciones</h2>
                <div className="mobileProfile__options">
                  <h4>Mi perfil</h4>
                  <CiMenuKebab onClick={toggleMenu1} className="menu-icon" />
                </div>
                {isMenuOpenProfile && (
                  <div className="dropdown__menuMobile">
                    <div className="dropdown__Info">
                      <div className='mobileTittle'>
                        <p>Nombre:</p>
                      </div>
                      <div className='mobileData'>
                        <p>{currentUser?.name}</p>
                      </div>
                      <div className='mobileTittle'>
                        <p>Email:</p>
                      </div>
                      <div className='mobileData'>
                        <p>{currentUser?.email}</p>
                      </div>
                      <div className='mobileTittle'>
                        <p>Teléfono:</p>
                      </div>
                      <div className='mobileData'>
                        <p>{currentUser?.phoneNumber}</p>
                      </div>
                      <div className='mobileTittle'>
                        <p>Rol:</p>
                      </div>
                      <div className='mobileData'>
                        <p>{currentUser?.role}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mobileProfile__options">
                  <h4>Mis Cursos</h4>
                  <CiMenuKebab onClick={toggleMenu2} className="menu-icon" />
                </div>
                {isMenuOpenCourses && (
                  <div className="dropdown__menuMobile">
                    <div className="dropdown__Info">
                      <div className='mobileTittle'>
                        <p className='modulesInfo'>Segundo Desarrollo de aplicaciones web - Turno de tarde</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mobileProfile__options">
                  <h4>Mis Notificaciones</h4>
                  <CiMenuKebab onClick={toggleMenu3} className="menu-icon" />
                </div>
                {isMenuOpenNotices && (
                  <div className="dropdown__menuMobile">
                  </div>
                )}
                <div className="mobileProfile__options">
                  <h4>Cambiar de Rol</h4>
                </div>
              </div>
            </div>
            <button className="logoutButton" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className='profilepage__desktop'>
          <div className='P_navigationTabs'>
            <NavigationTab />
          </div>
          <div className="PflContent">
            <div className="PflContent__Info">
              <div className="PflContent__ProfileCard">
                <div className="ProfileCard__icon">
                  <img src="./img/abstract-user-flat-4.png" alt="Imagen de perfil" />
                </div>
                <div className="ProfileCard__info">
                  <div className="Info__name">
                    <div className='nameUser '>
                      {currentUser?.name}
                    </div>
                  </div>
                  <div className="Info_email">
                    <div className='emailUser '>
                      {currentUser?.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="PflContent__GeneralInfo">
                <div className="generalInfo__title">
                  <h3>Información general</h3>
                </div>
                <div className="generalInfo__titles">
                  <div className="titles_content">
                    <div className="titles__data">
                      <h5>Mis Datos</h5>
                    </div>
                    <div className="titles__edit">
                      <h5>Editar Perfil</h5>
                    </div>
                  </div>
                </div>
                <div className="generalInfo__userdata">
                  <div className="userdata__Info">
                    <div className="info__userData">
                      <div className='userData__Tittle'>
                        <p>Nombre:</p>
                      </div>
                      <div className='userData__name'>
                        <p>{formState.name}</p>
                      </div>
                    </div>
                    <div className="info__userData">
                      <div className='userData__Tittle'>
                        <p>Email:</p>
                      </div>
                      <div className='userData__email'>
                        <p>{formState.email}</p>
                      </div>
                    </div>
                    <div className="info__userData">
                      <div className='userData__Tittle'>
                        <p>Teléfono:</p>
                      </div>
                      <div className='userData__phone'>
                        <p>{formState.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="info__userData">
                      <div className='userData__Tittle'>
                        <p>Rol:</p>
                      </div>
                      <div className='userData__roleText'>
                        <p>{formState.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="userdata__form">
                    <div className="form__userForm">
                      <div className='userData__formTittle'>
                        <p>Nombre:</p>
                      </div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          selectedUser ? handleUpdate() : handleCreate();
                        }}
                      >
                        <div className='userData__formText'>
                          <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={formState.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className='userData__formTittle'>
                          <p>Teléfono:</p>
                        </div>
                        <div className='userData__formText'>
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Teléfono"
                            value={formState.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button type="submit" className="formalities__button">
                          {selectedUser ? "Actualizar" : "Crear"}
                        </button>
                        {selectedUser && <button type="button" onClick={() => handleEdit()}>Cancelar</button>}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="generalInfo__title">
                  <h5>Mis Módulos</h5>
                </div>
                <div className="generalInfo__data">
                  <div className="info__ModulesData">
                    <div className='ModulesData__Tittle'>
                      <p>Impartiendo:</p>
                    </div>
                    <div className='ModulesData__name'>
                      <p>Segundo Desarrollo de aplicaciones web - Turno de tarde</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="P_rightsidemenu">
              <RigthMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default profile;