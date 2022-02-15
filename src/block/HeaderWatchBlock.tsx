import { useEffect, useState } from 'react';

const HeaderWatchBlock: React.VFC = () => {
  const [nowTime, setNowTime] = useState('');

  useEffect(() => {
    const watchInterval = setInterval(() => {
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      const date = new Date();
      const month = date.getMonth();
      const clockDate = date.getDate();
      const day = date.getDay();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const nowTime =
        `${month + 1}월 ${clockDate}일 (${week[day]})` +
        `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      setNowTime(nowTime);
    }, 1000);
    return () => {
      clearInterval(watchInterval);
    };
  }, []);

  return (
    <div className="header-watch-div">
      <p className="header-watch">{nowTime}</p>
    </div>
  );
};

export default HeaderWatchBlock;
