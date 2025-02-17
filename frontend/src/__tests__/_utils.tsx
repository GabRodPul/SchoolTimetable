import Admin from "#src/assets/page/AdminPage/AdminPage";
import Home from "#src/assets/page/HomePage/Home";
import LoginPageForm from "#src/assets/page/Login/LoginPage";
import NoticesPage from "#src/assets/page/NoticesPage/NoticesPage";
import TimeTablePage from "#src/assets/page/TimeTablePage/TimeTablePage";
import { createMemoryRouter, RouterProvider } from "react-router";
import ProfilePage from '../assets/page/ProfilePage/ProfilePage'
import FormalitiesPage from '../assets/page/FormalitiesPage/FormalitiesPage'
import TransactionsPage from '../assets/page/TransactionPage/TransactionPage'
import UserList from '../assets/componets/AdminLists/UserList'

/**
 * React components that useNavigate() need to be
 * inside of a Router. This function wraps
 * the passed ReactNode in one.
 * @param ui React element to test
 * @returns Router-wrapped ui
 */
export const TestApp = ({init = "/"} : { init?: string }) => {
  const MockRouter = createMemoryRouter([
    { path: '/',              Component: LoginPageForm    },
    { path: '/login',         Component: LoginPageForm    },
    { path: '/home',          Component: Home             },
    { path: '/notices',       Component: NoticesPage      },
    { path: '/profile',       Component: ProfilePage      },
    { path: '/admin',         Component: Admin            },
    { path: '/timetable',     Component: TimeTablePage    },
    { path: '/formalities',   Component: FormalitiesPage  },
    { path: '/transactions',  Component: TransactionsPage },
    { path: '/userslist',     Component: UserList         },
  ], { initialEntries: [ init ] });
  
  return (
    <RouterProvider router={MockRouter} />
  )
}