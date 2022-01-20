import React from 'react';
// import LoginPage from './pages/LoginPage';
import WallpaperImg from './image/WallpaperImg.jpg';
import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import Header from './common/Header';
// import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

const BackgroundDiv = styled.div`
  background-image: url(${WallpaperImg});
  width: 100vw;
  height: 100vh;
  @media only screen and (max-width: 768px) {
  }
`;

const App: React.VFC = () => {
  return (
    <BackgroundDiv>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BackgroundDiv>
  );
};

export default App;
