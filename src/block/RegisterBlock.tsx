import QueryString from 'qs';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { signUp, startRegister } from '../api/auth';
import image42 from '../image/42memory_title.png';

const StyledRegister = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 8px;
  border: 1px solid #beb5b4;
  background-color: #eeeeee;
  img {
    margin-top: 10px;
    width: 170px;
    height: 170px;
    border-image: linear-gradient(#ffffff, #c4c4c4) 5;
  }
  .register-header {
    width: 100%;
    height: 35px;
    display: flex;
    background: linear-gradient(#e1e1e1, #cecece);
    border-bottom: 1px solid #7e7e7e;
    border-radius: 8px 8px 0 0;
    align-items: center;
    justify-content: center;
    p {
      margin: 0 auto;
      font-size: 16px;
    }
  }
  .register-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 565px;
  }
  .register-text {
    margin-top: 10px;
    text-align: center;
  }
`;

const StyledForm = styled(Form)`
  width: 250px;
  margin-top: 15px;
  .btn-group {
    width: 100%;
    margin-top: 5px;
    justify-content: space-between;
  }
  .form-floating label {
    color: #bcbec1;
  }
  .form-control {
    height: 47px;
    border-radius: 10px;
    margin-bottom: 2px;
  }
  .btn-secondary {
    background-color: #6c757d !important;
    border-color: #6c757d !important;
    &:focus {
      background-color: #5c636a !important;
      border-color: #565e64 !important;
      box-shadow: none;
    }
  }
  .btn-primary {
    background-color: #0d6efd !important;
    border-color: #0d6efd !important;
    &:focus {
      background-color: #0b5ed7 !important;
      border-color: #0a58ca !important;
      box-shadow: none;
    }
  }
`;

const RegisterBlock: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const test = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
    e.preventDefault();
    const data = { accessToken: user.accessToken, userClusterName: 'bkwag' };
    try {
      const res = await signUp(data);
      console.log(res);
      console.log('test');
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const getUser = async (): Promise<any> => {
    try {
      const query = QueryString.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const res = await startRegister(query.code);
      setUser(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <StyledRegister>
      <div className="register-header">
        <p>42Memory 회원 가입</p>
      </div>
      <div className="register-body">
        <img src={image42} alt="42image" />
        <div className="register-text">
          42Memory에 오신 것을 환영합니다. <br />
          URL을 생성하기 위해 아래의 정보를 입력해주세요.
        </div>
        <StyledForm>
          <FloatingLabel label="username">
            <Form.Control type="text" placeholder="Username" disabled />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel label="PasswordConfirm">
            <Form.Control type="password" placeholder="PasswordConfirm" />
          </FloatingLabel>
          <FloatingLabel label="Deadline">
            <Form.Control type="date" placeholder="Deadline" disabled />
          </FloatingLabel>
          <div className="btn-group">
            <Button variant="secondary" size="sm">
              취소
            </Button>
            <Button variant="primary" type="submit" onClick={test} size="sm">
              확인
            </Button>
          </div>
        </StyledForm>
      </div>
    </StyledRegister>
  );
};

export default RegisterBlock;
