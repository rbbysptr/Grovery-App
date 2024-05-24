import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { redirect,createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Navbar from "./component/NavbarComponent/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";

function Main() {
  return (
    <>
      <Navbar />,
      <Outlet/>
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Main />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login')
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/add-grocery",
        element:<Add/>
      },
      {
        path: "/update-grocery/:id",
        element: <Update />
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect('/')
      }
      return null
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
