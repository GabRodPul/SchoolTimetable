import React, { useEffect } from 'react';
import CourseCard from '../../componets/CourseCard/CourseCard';
import './CourseStyles.css'
// import Modal from '../../componets/CourseFormModal/CourseFormModal';
import { ApiResourceProvider, useApi } from '../../../api/ApiContext';
import { CourseData } from '#common/@types/models';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '../../../types/api';


function Course() {
  const courses = [
    { title: 'Curso de React', description: 'Aprende los fundamentos de React.' },
    { title: 'Curso de JavaScript', description: 'Domina JavaScript desde cero.' },
    { title: 'Curso de CSS', description: 'Mejora tus habilidades de diseño con CSS.' },
  ];


  const [fetchRsrc, api] = useApi<CourseData>(ApiRts.Courses);
  useEffect(() => {
    if (fetchRsrc.state == FetchState.NotStarted)
      api.get({ id: 1 });
  }, []);
  console.log(fetchRsrc);

  return (
    <div>
      <main>
        <header>
          <h2 className='titleText'>Lista de Cursos</h2>
        </header>
        <div className='courseContainer'>
          <h1>Añadir Curso</h1>
          {/* <a href='/CourseFormPage'><button className="add-button" onClick={toggleModal}>Añadir</button></a> */}
          <div className='courseList'>
            {courses.map((course, index) => (
              <CourseCard key={index} title={course.title} description={course.description} />
            ))}
          </div>
        </div>
      </main>
      {fetchRsrc.state == FetchState.Loading && <strong>Loading</strong>}
      {fetchRsrc.state == FetchState.Error && <strong>Error</strong>}
      {fetchRsrc.state == FetchState.Success && fetchRsrc.data.code}
    </div>
  );
}

export default Course;