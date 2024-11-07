import './App.css'
import Home from './assets/page/HomePage/Home'
import Course from './assets/page/CoursePage/Course'
import CourseFormPage from './assets/page/CourseFormPage/CourseFormPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Course' element={<Course />} />
          <Route path='/CourseFormPage' element={<CourseFormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
