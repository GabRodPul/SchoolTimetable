import React from 'react';
import './NoticeDay.css'
import DayHour from '../DayHour/DayHour'

const NoticeDay = () => {
    const dayExample = [
        { code: 'DSW', teacher: 'TibCru', classroom: 'AulaT2' },
        { code: 'DSW', teacher: 'TibCru', classroom: 'AulaT2' },
        { code: 'EMR', teacher: 'Ester', classroom: 'AulaT2' },
    ];

    return (
            <div className='dayHour__container'>
                {dayExample.map((dayExp, index) => (
                    <DayHour key={index} code={dayExp.code} teacher={dayExp.teacher} classroom={dayExp.classroom} />
                ))}
            </div>
    );
};

export default NoticeDay;