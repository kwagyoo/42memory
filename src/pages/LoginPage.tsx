import { Form, Image } from 'react-bootstrap';
import styled from 'styled-components';
import image42 from '../image/42memory_title.png';

const LoginDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 370px;
  width: 300px;
  top: calc(50% - 185px);
  left: calc(50% - 150px);

  .thumbnail-42 {
    width: 170px;
    height: 170px;
    margin: 0 auto 1rem auto;
  }

  .thumbnail-42 img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .login-addtional {
    display: flex;
    flex-direction: column;
    .login-additional-btn {
      width: 100%;
      font-size: 15px;
      background-color: transparent;
      border: none;
      margin: 5px 0;
      color: #d3dde1;
    }
    .login-additional-btn:hover {
      color: #9f9f9f;
    }
  }
`;

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-control {
    padding-left: 1rem;
    border-radius: 19px;
    background: linear-gradient(to left, #65686b, #878b8e, #848588);
    color: #e7e7e7;
    font-weight: bold;
    &::placeholder {
      color: #bcbec1;
    }
    &,
    * {
      box-shadow: none !important;
    }
  }
`;

const LoginPage: React.FC = () => {
  const URL =
    'https://api.intra.42.fr/oauth/authorize?client_id=9ae035b5bc89a1fbaa1096e1889224f9955fb5ec8b834d53d26733485b8a7ed9&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregister&response_type=code';
  return (
    <LoginDiv>
      <div className="test">
        <div className="thumbnail-42">
          <Image src={image42} />
        </div>
        <CustomForm className="row g-3">
          <div className="col-md-12 col-lg-12">
            <Form.Control type="email" className="form-control" id="inputId" placeholder="아이디를 입력" />
          </div>
          <div className="col-md-12 col-lg-12">
            <Form.Control type="password" className="form-control" id="inputPassword" placeholder="암호 입력" />
          </div>
        </CustomForm>
        <div className="login-addtional">
          <a href={URL}>
            <button className="login-additional-btn">회원가입</button>
          </a>
          <button className="login-additional-btn">비밀번호를 잊으셨나요?</button>
        </div>
      </div>
    </LoginDiv>
  );
};

export default LoginPage;
