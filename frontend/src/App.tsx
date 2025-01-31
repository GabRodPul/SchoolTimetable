import './App.css'
// import Header from './assets/componets/CommonComps/Header/Header'
import Home from './assets/page/HomePage/Home'
// import CourseFormPage from './assets/page/CourseFormPage/CourseFormPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import GroupPage from './assets/page/GroupPage/GroupPage'
import NoticesPage from './assets/page/NoticesPage/NoticesPage'
import LoginPage from './assets/page/Login/LoginPage'
// import SigninPage from "./assets/page/Signin/SigninPage"
import HelpToolTip from './assets/componets/CommonComps/HelpToolTip/HelpToolTip'
import ProfilePage from './assets/page/ProfilePage/ProfilePage'
import Admin from './assets/page/AdminPage/AdminPage'
import TimeTablePage from './assets/page/TimeTablePage/TimeTablePage'
import FormalitiesPage from './assets/page/FormalitiesPage/FormalitiesPage'
import TransactionsPage from './assets/page/TransactionPage/TransactionPage'


function App() {

  return (
    <> 
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          {/* <Route path='/signin' element={<SigninPage />} /> */}
          <Route path='/home' element={<Home />} />
          <Route path='/notices' element={<NoticesPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/timetable' element={<TimeTablePage />} />
          <Route path='/formalities' element={<FormalitiesPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          {/* <Route path='/GroupPage' element={<GroupPage />} /> */}
        </Routes>
      </BrowserRouter>
      <HelpToolTip />
    </>
  )
}

export default App
