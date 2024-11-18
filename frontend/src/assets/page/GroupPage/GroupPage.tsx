import _React, { useEffect } from 'react';
import CourseCard from '../../componets/Cards/CourseCard/CourseCard';
import './GroupPageStyles.css'
// import Modal from '../../componets/CourseFormModal/CourseFormModal';
import { ApiResourceProvider, useApi } from '../../../api/ApiContext';
import { CourseData } from '#common/@types/models';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '../../../types/api';


function GroupPage() {
  const courses = [
    { title: 'DAW', description: 'Desarrollo de aplicaciones web' },
    { title: 'DAM', description: 'Desarrollo de aplicaciones multiplataforma' },
    { title: 'ASIR', description: 'Administracion de sistemas informáticon en red' },
  ];


  const [ fetchRsrc, api ] = useApi<CourseData>(ApiRts.Courses);
  useEffect(() => {
    if ( fetchRsrc.state == FetchState.NotStarted )
      api.get({ id: 1 });
  }, []);
  console.log(fetchRsrc);

  return (
    <div>
      <main>
        <header>
          <h2 className='groupPageTitleText'>Lista de Cursos</h2>
        </header>
        <div className='GroupContainer'>
          <h1>Añadir Curso</h1>
          {/* <a href='/CourseFormPage'><button className="add-button" onClick={toggleModal}>Añadir</button></a> */}
          <div className='GroupList'>
            {courses.map((group, index) => (
              <CourseCard key={index} title={group.title} description={group.description} />
            ))}
          </div>
        </div>
      </main>
      { fetchRsrc.state == FetchState.Loading && <strong>Loading</strong> } 
      { fetchRsrc.state == FetchState.Error   && <strong>Error  </strong> } 
      { fetchRsrc.state == FetchState.Success && fetchRsrc.data.code    } 
    </div>
  );
}

export default GroupPage;