import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import PersonalLogin from './PersonalLogin';
import PersonalPage from './PersonalPage';
import GeneralSpotifyHistory from './GeneralSpotifyHistory';
import AboutPage from './AboutPage';
import GeneralLogin from './GeneralLogin';

function App() {
  const backendLoginRoute = 'http://localhost:5005/auth/login' // dev -> use nginx for production???
  //if not alreadty logged in check etc
  // ( now PersonalLogin component acts as loginbutton, doesnt check if we are already logged in )

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          
          <Route path="/"element={<>
            <GeneralLogin loginRoute={backendLoginRoute}/>
          </>}/>
         
          <Route path="/homepage" element={<>
            <Navbar loginRoute={backendLoginRoute}/>
            <PersonalLogin loginRoute={backendLoginRoute}/>
            <GeneralSpotifyHistory/>
          </>}/>
         
          <Route path="profile" element={<>
            <Navbar loginRoute={backendLoginRoute}/>
            <PersonalPage/>
          </>}/>
         
          <Route path="about" element={<>
              <Navbar loginRoute={backendLoginRoute}/>
              <AboutPage />
          </>}/>
          
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;