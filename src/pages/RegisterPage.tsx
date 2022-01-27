import { useEffect, useState } from 'react';
import { startRegister } from '../api/auth';
import RegisterBlock from '../block/RegisterBlock';
import QueryString from 'qs';

const RegisterPage: React.FC = () => {
  const [user, setUser] = useState([]);
  console.log(user);

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
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <RegisterBlock />
    </div>
  );
};

export default RegisterPage;
