import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//import { BrowserRouter } from 'react-router-dom';
//---------------import page--------------------
import SignIn from './pages/Authentication/signin';
import Welcome from './pages/welcome';
import Register from './pages/Authentication/register';
//---------------import page--------------------
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//create router-------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome/>,
  },{
    path: "/login",
    element: <SignIn/>,
  },{
    path: "/register",
    element: <Register/>,
  }
]);

//render
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
