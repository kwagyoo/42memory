import { Dropdown, DropdownButton, Overlay, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../image/42memory_apple_logo.png';
import CopyToClipboard from 'react-copy-to-clipboard';
import copyImg from '../image/42memory_copy.png';
import wifiImg from '../image/Wifi.png';
import battery from '../image/Battery.png';
import setting from '../image/Setting.png';
import { useNavigate } from 'react-router';
import HeaderWatchBlock from '../block/HeaderWatchBlock';
import { useCallback, useContext, useRef, useState } from 'react';
import { LoginContext } from '../module/LoginContext';

const StyledDropdown = styled.div`
  height: 100%;
  flex: 1 0 33%;

  * {
    box-shadow: none !important;
  }

  .dropdown {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
    button {
      padding: 0;
      color: #dee2e6;
      background-color: transparent;
      border: none;
    }

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
    .dropdown-menu {
      border-radius: 0 0 8px 8px;
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
    justify-content: flex-end;
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
  const navigate = useNavigate();
  const { login, setLogin } = useContext(LoginContext);
  const userDeadline = sessionStorage.getItem('userDeadline')?.split('T')[0];
  const onLogout = useCallback((): void => {
    sessionStorage.clear();
    setLogin(false);
    navigate('/');
  }, []);

  const target = useRef(null);
  const [show, setShow] = useState(false);
  return (
    <StyledHeader>
      <StyledDropdown>
        <DropdownButton title={<img className="thumbnail-image" src={logo} alt="user pic" />} menuVariant="dark">
          <Dropdown.Item target="_blank" href="https://github.com/kwagyoo/42memory">
            42Memory에 관해
          </Dropdown.Item>
          <Dropdown.Item target="_blank" href="https://github.com/kwagyoo/42memory/issues">
            문제리포트
          </Dropdown.Item>
          {login && (
            <>
              <Dropdown.Item>
                <CopyToClipboard
                  text={`http://${import.meta.env.VITE_HOME ?? ''}/message/${sessionStorage.getItem('userID') ?? ''}`}
                  onCopy={() => console.log('copy')}
                >
                  <button>URL 복사하기</button>
                </CopyToClipboard>
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>42Memory 종료</Dropdown.Item>
            </>
          )}
        </DropdownButton>
      </StyledDropdown>
      <div className="clipboard">
        {login && (
          <>
            <CopyToClipboard
              text={`http://${import.meta.env.VITE_HOME ?? ''}/message/${sessionStorage.getItem('userID') ?? ''}`}
              onCopy={() => {
                setShow(true);
                setTimeout(() => setShow(false), 1000);
              }}
            >
              <button ref={target} className="clipboard-btn">
                <img src={copyImg} />
                http://{import.meta.env.VITE_HOME ?? ''}/message/{sessionStorage.getItem('userID')}
              </button>
            </CopyToClipboard>
            <Overlay target={target.current} show={show} placement="bottom">
              {(props) => (
                <Tooltip data-html="true" id="overlay-example" {...props}>
                  복사되었습니다. <br />
                  만료 기간: ~{userDeadline}
                </Tooltip>
              )}
            </Overlay>
          </>
        )}
      </div>
      <div className="header-status-bar">
        <div className="header-icon-list">
          <img src={wifiImg} alt="wifi icon" />
          <img src={battery} alt="battery icon" />
          <img src={setting} alt="setting icon" />
        </div>
        <HeaderWatchBlock />
      </div>
    </StyledHeader>
  );
};

export default Header;
