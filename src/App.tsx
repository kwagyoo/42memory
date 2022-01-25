import React from 'react';
import WallpaperImg from './image/WallpaperImg.jpg';
import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import Header from './common/Header';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import ZindexProvider from './module/Context';

const BackgroundDiv = styled.div`
  background-image: url(${WallpaperImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
  }
`;

const App: React.VFC = () => {
  return (
    <BackgroundDiv>
      <Header />
      <ZindexProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ZindexProvider>
    </BackgroundDiv>
  );
};

export default App;
