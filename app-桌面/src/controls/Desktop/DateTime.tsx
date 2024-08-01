import React, { memo, useState, useEffect } from 'react';
import S from './header.module.scss';

const DateTime:React.FC = () => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const [dateString, setDateString] = useState('');
    useEffect(() => {
        let timer = setInterval(() => {
            const d = new Date();
            const YYYY = d.getFullYear();
            const MM = d.getMonth() + 1;
            const DD = d.getDate();
            const HH = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`;
            const mm = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;
            const ss = d.getSeconds() >= 10 ? d.getSeconds() : `0${d.getSeconds()}`;
            const dd = d.getDay();
            const dateStr = `${YYYY}年${MM}月${DD}日 ${HH}:${mm}:${ss} 星期${days[dd]}`
            setDateString(dateStr);
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    return (
        <div className={S.dateTime}>
            {dateString}
        </div>
    )
}

export default memo(DateTime);