import { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { checkUser } from '../api/auth';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();

  const checkUserName = async (): Promise<void> => {
    const userID = sessionStorage.getItem('receiveUserID');
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (userID !== null && query.code !== undefined) {
      const code = (query.code as string).toString();
      const userClusterName = sessionStorage.getItem('receiveClusterName');
      const res = await checkUser(code);
      console.log(res);
      if (userClusterName === res.ClusterName) {
        alert('본인의 계정에 메세지를 남길 수 없습니다');
        navigate('/');
      } else navigate(`/message/${userID}/write?accessToken=${res.accessToken}`);
    }
  };

  useEffect(() => {
    void checkUserName();
  });
  return <div></div>;
};

export default RedirectPage;
