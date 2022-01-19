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
`;

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginDiv>
      <div className="test">
        <div className="thumbnail-42">
          <Image src={image42} />
        </div>
        <CustomForm className="row g-3">
          <div className="col-md-12 col-lg-12">
            <Form.Control type="email" className="form-control" id="inputEmail4" placeholder="아이디를 입력해주세요" />
          </div>
          <div className="col-md-12 col-lg-12">
            <Form.Control type="password" className="form-control" id="inputPassword4" placeholder="비밀번호를 입력해주세요" />
          </div>
        </CustomForm>
      </div>
    </LoginDiv>
  );
};

export default LoginPage;
