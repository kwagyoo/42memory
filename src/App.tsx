import React from "react";
import LoginPage from "./pages/LoginPage";
import WallpaperImg from "./image/WallpaperImg.jpg";
import styled from "styled-components";
import { Route, Routes } from "react-router";

const BackgroundDiv = styled.div`
  background-image: url(${WallpaperImg});
  width: 100vw;
  height: 100vh;
  @media only screen and (max-width: 768px) {
  }
`;

const App: React.FC = () => {
  return (
    <BackgroundDiv>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BackgroundDiv>
  );
};

export default App;
