import React from 'react';
import '../../App'
import CourseCard from '../../assets/componets/CourseCard/CourseCard'


function Course() {
    const courses = [
      { title: 'Curso de React', description: 'Aprende los fundamentos de React.' },
      { title: 'Curso de JavaScript', description: 'Domina JavaScript desde cero.' },
      { title: 'Curso de CSS', description: 'Mejora tus habilidades de diseño con CSS.' },
    ];
  
    return (
      <div>
      {/* <Header /> */}
      <main>
        <div className='container'>
          <h1>Lista de Cursos</h1>
          <button className="add-button">Añadir</button>
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