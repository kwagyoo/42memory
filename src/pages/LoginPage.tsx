import { Form, Image } from 'react-bootstrap';
import styled from 'styled-components';
import image42 from '../image/42memory_title.png';
import { BsArrowRightCircle } from 'react-icons/bs';
import { signIn, SignInFetch } from '../api/auth';
import { useNavigate } from 'react-router';
import client from '../api/client';

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
  .inputDiv {
    position: relative;
    .submit-btn {
      position: absolute;
      left: 170px;
      top: 3px;
      width: 30px;
    }
    .submit-icon {
      width: 100%;
      cursor: pointer;
      color: white;
    }
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_REGISTER_URL;
  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    const { inputId, inputPassword } = e.currentTarget;
    const data = { userClusterName: inputId.value, userPassword: inputPassword.value };
    try {
      const res: SignInFetch = await signIn(data);
      sessionStorage.setItem('accessToken', res.accessToken);
      sessionStorage.setItem('userID', res.userID);
      sessionStorage.setItem('userClusterName', res.userClusterName);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      client.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
      navigate(`/mainPage/${res.userID}`);
    } catch (e: any) {
      console.log(e.response);
    }
  };
  return (
    <LoginDiv>
      <div>
        <div className="thumbnail-42">
          <Image src={image42} />
        </div>
        <CustomForm className="row g-3" onSubmit={onLogin}>
          <div className="col-md-12 col-lg-12">
            <Form.Control type="text" className="form-control" id="inputId" placeholder="아이디를 입력" />
          </div>
          <div className="inputDiv">
            <Form.Control type="password" className="form-control" id="inputPassword" placeholder="암호 입력" />
            <button className="submit-btn" type="submit">
              <BsArrowRightCircle className="submit-icon" />
            </button>
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
