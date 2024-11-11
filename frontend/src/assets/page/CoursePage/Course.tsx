import React from 'react';
import CourseCard from '../../componets/CourseCard/CourseCard';
import Header from '../../componets/CommonComponets/Header/Header';
import './CourseStyles.css'
import LoremModal from 'src/assets/componets/CourseFormModal/CourseFormModal';


function Course() {
  const courses = [
    { title: 'Curso de React', description: 'Aprende los fundamentos de React.' },
    { title: 'Curso de JavaScript', description: 'Domina JavaScript desde cero.' },
    { title: 'Curso de CSS', description: 'Mejora tus habilidades de diseño con CSS.' },
  ];

  return (
    <div>
      <Header />
      <main>
        <header>
          <h2 className='titleText'>Lista de Cursos</h2>
        </header>
        <div className='courseContainer'>
          <h1>Añadir Curso</h1>
          <button className='add-button'><a href='/CourseFormPage'>Añadir</a></button>
          <div className='courseList'>
            {courses.map((course, index) => (
              <CourseCard key={index} title={course.title} description={course.description} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Course;