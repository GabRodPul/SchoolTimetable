import './App.css'
// import Header from './assets/componets/CommonComps/Header/Header'
import Home from './assets/page/HomePage/Home'
// import CourseFormPage from './assets/page/CourseFormPage/CourseFormPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import GroupPage from './assets/page/GroupPage/GroupPage'
import NoticesPage from './assets/page/NoticesPage/NoticesPage'
import LoginPage from './assets/page/Login/LoginPage'
import SigninPage from "./assets/page/Signin/SigninPage"
import HelpToolTip from './assets/componets/CommonComps/HelpToolTip/HelpToolTip'

function App() {

  return (
    <>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/LogingPage' element={<LoginPage />} />
          <Route path='/Signin' element={<SigninPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/NoticesPage' element={<NoticesPage />} />
          {/* <Route path='/GroupPage' element={<GroupPage />} /> */}
        </Routes>
      </BrowserRouter>
      <HelpToolTip />
    </>
  )
}

export default App
