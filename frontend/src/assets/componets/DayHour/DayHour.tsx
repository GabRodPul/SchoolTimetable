import React from 'react';
import './DayHourStyles.css';

//Interface defined
interface DayHourProps {
    code: string;
    teacher: string;
    classroom: string;
}

//Used interface
const DayHour: React.FC<DayHourProps> = ({ code, teacher, classroom }) => {
    return (
            <div className="dayHourContainer">
                <h2 className="dayHour__code">{code}</h2>
                <p className="dayHour__teacher">{teacher}</p>
                <p className="dayHour__classroom">{classroom}</p>
            </div>
    );
};

export default DayHour;