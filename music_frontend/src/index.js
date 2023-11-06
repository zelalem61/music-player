// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import {createContext, useContext,useState} from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridScreen from "./components/gridScreen";
import SignUp from "./components/signup";
import Login from "./components/login";

export const Context = createContext();

export const useData = () => {
  return useContext(Context);
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Context.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GridScreen />}>
              {/* <Route index element={<Home />} /> */}
              <Route path="login" element={<Login />} />
              <Route path="SignUp" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </Context.Provider>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);