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
import ErrorContextProvider from './module/ErrorContext';
import LoginContextProvider from './module/LoginContext';
import { useMediaQuery } from 'react-responsive';
import { Alert } from 'react-bootstrap';

const BackgroundDiv = styled.div`
  background-image: url(${WallpaperImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const GuideDiv = styled.div`
  background-image: url(${WallpaperImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: gray;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .alert {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const App: React.VFC = () => {
  const isPcW = useMediaQuery({
    query: '(min-width : 1280px)',
  });
  const isPcH = useMediaQuery({
    query: '(min-height : 750px)',
  });

  console.log(isPcW, isPcH);

  return (
    <>
      {isPcW && isPcH ? (
        <BackgroundDiv>
          <LoginContextProvider>
            <Header />
            <ErrorContextProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main/:userID" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/redirect" element={<RedirectPage />} />
                <Route path="/message/:userID/write" element={<WritePage />} />
                <Route path="/message/:userID" element={<MessageLoginPage />} />
                <Route path="*" element={<MainPage />} />
              </Routes>
            </ErrorContextProvider>
          </LoginContextProvider>
        </BackgroundDiv>
      ) : (
        <GuideDiv>
          <Alert show={true} variant="danger">
            <Alert.Heading>브라우저 크기를 조절해주세요(1280px & 750px)</Alert.Heading>
          </Alert>
        </GuideDiv>
      )}
    </>
  );
};

export default App;
