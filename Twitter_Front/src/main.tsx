import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import MainMenu from "./components/MainMenu.tsx"
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LogIn from './components/Authentication/LogIn.tsx'
import SignUp from './components/Authentication/SignUp.tsx';
import NewTweet from './components/Tweet/NewTweet.tsx';
import Profile from './components/Profile/Profile.tsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:<MainMenu/>
  },
  {
    path:'/profile',
    element: <Profile/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/login',
    element:<LogIn/>
  },
  {
    path:'/tweet',
    // element:
  },
  {
    path:'/new',
    element: <NewTweet/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
