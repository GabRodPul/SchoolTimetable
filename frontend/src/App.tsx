import './App.css'
import Header from './assets/componets/CommonComps/Header/Header'
import Home from './assets/page/HomePage/Home'
import Course from './assets/page/CoursePage/Course'
import CourseFormPage from './assets/page/CourseFormPage/CourseFormPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GroupPage from './assets/page/GroupPage/GroupPage'
import NoticesPage from './assets/page/NoticesPage/NoticesPage'
import LogingPage from './assets/page/Login/LogingPage'
import UserPageMobile from './assets/page/UserPageMobile/UserPageMobile'

function App() {

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogingPage />} />
          <Route path='/LogingPage' element={<LogingPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/NoticesPage' element={<NoticesPage />} />
          <Route path='/Course' element={<Course />} />
          <Route path='/CourseFormPage' element={<CourseFormPage />} />
          <Route path='/GroupPage' element={<GroupPage />} />
          <Route path='/UserPage' element={<UserPageMobile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
