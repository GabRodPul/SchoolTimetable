import React from 'react';
import './NoticeDay.css'
import HourSlot from '../TimeTableComps/HourSlot/HourSlot'

const NoticeDay = () => {
    const dayExample = [
        { module: 'DSW', teacher: 'TibCru', group: '2DawT' },
        { module: 'DSW', teacher: 'TibCru', group: '2DawT' },
        { module: 'EMR', teacher: 'Ester', group: '2DawT' },
    ];

    return (
            <div className='dayHour__container'>
                {dayExample.map((dayExp, index) => (
                    <HourSlot key={index} module={dayExp.module} teacher={dayExp.teacher} group={dayExp.group} />
                ))}
            </div>
    );
};

export default NoticeDay;