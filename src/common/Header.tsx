import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../image/42memory_apple_logo.png';
import CopyToClipboard from 'react-copy-to-clipboard';
import copyimg from '../image/42memory_copy.png';

const StyledDropdown = styled.div`
  height: 100%;
  flex: 0 0 64px;
  .dropdown {
    display: flex;
    justify-content: center;
  }
  .btn {
    width: 90%;
    padding: 0.1rem;
  }
  .dropdown,
  .btn,
  img {
    background-color: transparent;
    height: 95%;
    border: none;
    padding-bottom: 0.12rem;
    vertical-align: baseline;
  }
  button:focus {
    background-color: transparent;
    border: none;
    outline: none !important;
    box-shadow: none !important;
  }
  .open > .dropdown-toggle {
    background-color: transparent !important;
    outline: 0 !important;
    border: none !important;
  }
  .dropdown-toggle::after {
    display: none;
  }
`;

const StyledHeader = styled.div`
  width: 100vw;
  height: 25px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  flex-direction: row;
  .clipboard {
    flex: 0 0 150px;
    .clipboard-btn {
      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
      background-color: transparent;
      border: none;
    }
  }
`;

const Header: React.FC = () => {
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
            <img src={copyimg} />
            clipboard test
          </button>
        </CopyToClipboard>
      </div>
      <div>icon</div>
      <div>date</div>
    </StyledHeader>
  );
};

export default Header;
