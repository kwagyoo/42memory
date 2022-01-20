import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../image/42memory_apple_logo.png';
import CopyToClipboard from 'react-copy-to-clipboard';
import copyImg from '../image/42memory_copy.png';
import wifiImg from '../image/Wifi.png';
import battery from '../image/Battery.png';
import setting from '../image/Setting.png';

import { useEffect, useState } from 'react';

const StyledDropdown = styled.div`
  height: 100%;
  flex: 1 0 33%;

  * {
    border: none;
    outline: none !important;
    box-shadow: none !important;
  }

  .dropdown {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
    .btn {
      width: 60px;
      height: 100%;
      padding: 0.1rem;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-primary.dropdown-toggle {
      background-color: transparent !important;
      &:hover {
        background-color: gray !important;
      }
    }
    .dropdown-toggle::after {
      display: none;
    }
  }
  img {
    background-color: transparent;
    width: 20px;
    height: 20px;
    border: none;
  }
`;

const StyledHeader = styled.div`
  width: 100vw;
  height: 30px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  flex-direction: row;
  .clipboard {
    flex: 1 0 34%;
    display: flex;
    align-items: center;
    justify-content: center;
    .clipboard-btn {
      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
      font-size: 18px;
      color: white;
      background-color: transparent;
      border: none;
    }
  }
  .header-status-bar {
    display: flex;
    flex: 1 0 33%;
    justify-content: end;
  }
  .header-icon-list {
    display: flex;
    flex: 0 0 70px;
    justify-content: space-between;
    align-items: center;
    img {
      width: 20px;
      height: 15px;
      margin-right: 10px;
    }
  }
  .header-watch {
    margin: auto 0;
    font-size: 18px;
    color: white;
  }
  .header-watch-div {
    width: 175px;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const Header: React.FC = () => {
  const [nowTime, setNowTime] = useState('');

  useEffect(() => {
    const watchInterval = setInterval(() => {
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      const date = new Date();
      const month = date.getMonth();
      const clockDate = date.getDate();
      const day = date.getDay();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const nowTime =
        `${month + 1}월 ${clockDate}일 (${week[day]})` +
        `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      setNowTime(nowTime);
    }, 1000);
    return () => {
      clearInterval(watchInterval);
    };
  }, []);

  return (
    <StyledHeader>
      <StyledDropdown>
        <DropdownButton title={<img className="thumbnail-image" src={logo} alt="user pic" />} menuVariant="dark">
          <Dropdown.Item>42Memory에 관해</Dropdown.Item>
          <Dropdown.Item>내 URL 복사하기</Dropdown.Item>
          <Dropdown.Item>문제리포트</Dropdown.Item>
          <Dropdown.Item>42Memory 종료</Dropdown.Item>
        </DropdownButton>
      </StyledDropdown>
      <div className="clipboard">
        <CopyToClipboard text="hello" onCopy={() => console.log('copy')}>
          <button className="clipboard-btn">
            <img src={copyImg} />
            clipboard test
          </button>
        </CopyToClipboard>
      </div>
      <div className="header-status-bar">
        <div className="header-icon-list">
          <img src={wifiImg} alt="wifi icon" />
          <img src={battery} alt="battery icon" />
          <img src={setting} alt="setting icon" />
        </div>
        <div className="header-watch-div">
          <p className="header-watch">{nowTime}</p>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
