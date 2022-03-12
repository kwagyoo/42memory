import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import styled from 'styled-components';
import { signUp } from '../api/auth';
import image42 from '../image/42memory_title.png';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { ErrorContext } from '../module/ErrorContext';
import LoadingModal from '../common/LoadingModal';

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
  width: 350px;
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
  .form-floating label {
    color: #77787a;
  }
  .form-floating > .form-control:focus ~ label,
  .form-floating > .form-control:not(:placeholder-shown) ~ label,
  .form-floating > .form-select ~ label {
    opacity: 0.8;
  }
  .form-floating {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .error-message {
    padding-top: 15px;
    width: 300px;
    color: #e7747f;
    font-weight: 300;
    text-align: end;
  }
`;

interface userProps {
  userClusterName?: string;
  userDeadline: string;
  userEmail?: string;
  userPassword?: string;
}

interface FormValues {
  userClusterName: string;
  userEmail: string;
  userPassword: string;
  userPasswordConfirm: string;
}

const RegisterBlock: React.VFC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userProps>({
    userClusterName: '',
    userDeadline: '',
    userEmail: '',
    userPassword: '',
  });
  const { setError, setErrorText } = useContext(ErrorContext);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRegister = useCallback(
    async (values: FormValues & userProps): Promise<void> => {
      if (loading) return;
      try {
        setCompleted(false);
        setLoading(true);
        await signUp(values);
        navigate('/');
      } catch (e: unknown) {
        setCompleted(true);
        setLoading(false);
        setError(true);
        setErrorText('회원가입에 실패했습니다.');
      }
    },
    [loading],
  );

  //    42API 만료로 인해 기능 사용 정지
  //
  //   const getUser = useCallback(async (): Promise<void> => {
  //     try {
  //       const query = QueryString.parse(location.search, {
  //         ignoreQueryPrefix: true,
  //       });
  //       const res = await fetch42(query.code as string, 'register');
  //       const began = new Date(res.data.cursus_users[1].begin_at);
  //       const blackholed = new Date(res.data.cursus_users[1].blackholed_at);
  //       const expired = new Date(began.getFullYear() + 2, began.getMonth(), began.getDate() - 1);
  //       const finalDate = blackholed < expired ? blackholed : expired;
  //       const restDay = (finalDate.getTime() - Date.now()) / (1000 * 3600 * 24);
  //       if (restDay < 0 || restDay > 31) throw new Error('UnavailableDate');
  //       setUser({
  //         userClusterName: res.data.login,
  //         userDeadline: finalDate.toISOString().split('T')[0],
  //         accessToken: res.accessToken,
  //       });
  //     } catch (e: unknown) {
  //       console.log(e);
  //       if (axios.isAxiosError(e)) {
  //         alert('유저 정보를 가져올 수 없습니다.');
  //       } else {
  //         alert('블랙홀로 빠져들기 1달(31일) 전부터 링크 생성이 가능합니다.');
  //       }
  //       navigate('/');
  //     }
  //   }, []);

  useEffect(() => {
    const today = new Date();
    const expired = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    setUser({ userDeadline: expired.toISOString().split('T')[0] });
  }, []);

  const initialValues: FormValues = { userClusterName: '', userEmail: '', userPassword: '', userPasswordConfirm: '' };

  const SignupSchema = Yup.object().shape({
    userEmail: Yup.string().email('Invalid email').required('Required'),
    userPassword: Yup.string().min(6, 'Too Short!').max(13, 'Too Long!').required('Required'),
    userPasswordConfirm: Yup.string().oneOf([Yup.ref('userPassword'), null], 'Passwords must match'),
  });

  return (
    <StyledRegister>
      {loading && <LoadingModal completed={completed} />}
      <div className="register-header">
        <p>42Memory 회원 가입</p>
      </div>
      <div className="register-body">
        <img src={image42} alt="42image" />
        <div className="register-text">
          42Memory에 오신 것을 환영합니다. <br />
          URL을 생성하기 위해 아래의 정보를 입력해주세요.
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            void onRegister({ ...values, ...user });
            setSubmitting(false);
          }}
        >
          {({ touched, values, handleChange, handleBlur, handleSubmit, errors }) => (
            <StyledForm onSubmit={handleSubmit}>
              <FloatingLabel label="username">
                <Form.Control
                  type="text"
                  name="userClusterName"
                  id="inputClusterName"
                  placeholder="ClusterName"
                  value={values.userClusterName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="email">
                <Form.Control
                  type="email"
                  name="userEmail"
                  id="inputEmail"
                  placeholder="Email"
                  value={values.userEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.userEmail != null && touched.userEmail != null ? <div className="error-message">{errors.userEmail}</div> : null}
              </FloatingLabel>
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  name="userPassword"
                  id="inputPassword"
                  placeholder="Password(6~12자)"
                  value={values.userPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.userPassword != null && touched.userPassword != null ? <div className="error-message">{errors.userPassword}</div> : null}
              </FloatingLabel>
              <FloatingLabel label="PasswordConfirm">
                <Form.Control
                  type="password"
                  name="userPasswordConfirm"
                  id="inputPasswordConfirm"
                  placeholder="PasswordConfirm(6~12자)"
                  value={values.userPasswordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.userPasswordConfirm != null && touched.userPasswordConfirm != null ? (
                  <div className="error-message">{errors.userPasswordConfirm}</div>
                ) : null}
              </FloatingLabel>
              <FloatingLabel label="Deadline">
                <Form.Control type="date" placeholder="Deadline" value={user.userDeadline} disabled />
              </FloatingLabel>
              <div className="btn-group">
                <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
                  취소
                </Button>
                <Button variant="primary" type="submit" size="sm">
                  확인
                </Button>
              </div>
            </StyledForm>
          )}
        </Formik>
      </div>
    </StyledRegister>
  );
};

export default RegisterBlock;
