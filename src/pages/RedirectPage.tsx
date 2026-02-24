import { useEffect, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { fetch42 } from '../api/auth';
import LoadingModal from '../common/LoadingModal';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const checkUserName = async (): Promise<void> => {
    const userID = sessionStorage.getItem('receiveUserID');
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (userID !== null && query.code !== undefined) {
      try {
        const code = (query.code as string).toString();
        const userClusterName = sessionStorage.getItem('receiveClusterName');
        const res = await fetch42(code, 'redirect');
        setCompleted(true);
        if (userClusterName === res.data.login) {
          alert('본인의 계정에 메세지를 남길 수 없습니다');
          navigate('/');
        } else {
          sessionStorage.setItem('accessToken', res.accessToken);
          navigate(`/message/${userID}/write`);
        }
      } catch (err) {
        console.error(err);
        alert('오류가 발생하였습니다.');
        sessionStorage.clear();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    void checkUserName();
  }, []);
  return (
    <div>
      <LoadingModal completed={completed} />
    </div>
  );
};

export default RedirectPage;
