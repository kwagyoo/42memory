import React from 'react';
import WallpaperImg from './image/WallpaperImg.jpg';
import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import Header from './common/Header';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WritePage from './pages/WritePage';
import MessageLoginPage from './pages/MessageLoginPage';
import RedirectPage from './pages/RedirectPage';
import ErrorContextProvider from './module/Context';

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
      <ErrorContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainPage/:userID" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/message/:userID/write" element={<WritePage />} />
          <Route path="/message/:userID" element={<MessageLoginPage />} />
        </Routes>
      </ErrorContextProvider>
    </BackgroundDiv>
  );
};

export default App;
