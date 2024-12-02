// import React from 'react';
import { FaSearch } from "react-icons/fa";
import './NoticesPageStyles.css'
import NoticeCard from '../../componets/Cards/NoticeCard/NoticeCard'
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { WarningData } from '#common/@types/models';

export type WarningData = {
    teacherId:      number,
    description:    string,
    startDate:      Date,
    endDate:        Date,
    startHour:      string, // MySQL TIME
    endHour:        string, // MySQL TIME
} 

function NoticesPage() {
    const notices: Omit<WarningData, "teacherId">[] = [
        {
            description:    "Se ha realizado un cambio en el horario.",
            startDate:      new Date("2025-02-12"),
            endDate:        new Date("2025-02-12"),
            startHour:      "16:50:00",
            endHour:        "17:45:00"
        },
        {
            description:    "Se ha realizado un cambio en el horario.",
            startDate:      new Date("2025-02-12"),
            endDate:        new Date("2025-02-12"),
            startHour:      "16:50:00",
            endHour:        "17:45:00"
        },
        {
            description:    "Se ha realizado un cambio en el horario.",
            startDate:      new Date("2025-02-12"),
            endDate:        new Date("2025-02-12"),
            startHour:      "16:50:00",
            endHour:        "17:45:00"
        },
    ];

    return (
        <div>
            <div className="notifications">
                <h2>Notificaciones</h2>
                {/* { notices.forEach(n => n) } */}
            </div>
        </div>
    );
}

export default NoticesPage;