// import React from 'react';
import "./NoticeCompMobileStyles.css"
import { useRef, useState } from 'react';
import { Id, WarningData } from '#common/@types/models';
import { FaRegBell } from "react-icons/fa";
import { useApi } from "#src/api/ApiContext";
import { ApiRts } from "#common/@enums/http";
import { CiMenuKebab } from "react-icons/ci";

enum ReminderKind {
    Exam = "Exam",
    Assignment = "Assignment",
    Project = "Project"
};

type ReminderData = {
    kind: ReminderKind,
    description: string,
    date: Date,
}


const dateStr = (d: Date) => d.toJSON().slice(0, 10);

const NoticeMobile: React.FC = () => {
    let init = false;
    const notifRef = useRef(null);
    const remdrRef = useRef(null);

    const [notifShown, setNotifShown] = useState(false);
    const [remdrShown, setRemdrShown] = useState(false);

    const [fetchRsrc, api] = useApi<WarningData>(ApiRts.Warnings);

    const notices: Omit<WarningData & Id, "teacherId">[] = [
        {
            id: 1,
            description: "Se ha realizado un cambio en el horario.",
            startDate: "2025-02-12",
            endDate: "2025-02-12",
            startHour: "16:50:00",
            endHour: "17:45:00"
        },
        {
            id: 2,
            description: "Se ha realizado un cambio en el horario.",
            startDate: "2025-02-12",
            endDate: "2025-02-12",
            startHour: "16:50:00",
            endHour: "17:45:00"
        },
        {
            id: 3,
            description: "Se ha realizado un cambio en el horario.",
            startDate: "2025-02-12",
            endDate: "2025-02-12",
            startHour: "16:50:00",
            endHour: "17:45:00"
        },
    ];

    const reminders: ReminderData[] = [
        {
            kind: ReminderKind.Exam,
            description: "Examen ERM",
            date: new Date("2025-02-28"),
        },
        {
            kind: ReminderKind.Assignment,
            description: "Tarea 2.6 de DPL",
            date: new Date("2025-02-25"),
        },
        {
            kind: ReminderKind.Project,
            description: "Proyecto DSW 1ºEntrega",
            date: new Date("2025-03-05"),
        },
        {
            kind: ReminderKind.Assignment,
            description: "Tarea 2.8 de DPL",
            date: new Date("2025-02-30"),
        },
        {
            kind: ReminderKind.Assignment,
            description: "Tarea 5 de ERM",
            date: new Date("2025-02-23"),
        },
        {
            kind: ReminderKind.Exam,
            description: "Examen DPL",
            date: new Date("2025-03-04"),
        },
    ];

    const toggleSection = (query: string) => {
        document.querySelector(query);
    }

    const [isNotification, setNotification] = useState(false);
    const [isReminder, setReminder] = useState(false);

    const toggleMenu1 = () => {
        setNotification(!isNotification);;
    };

    const toggleMenu2 = () => {
        setReminder(!isReminder);;
    };

    return (
        <div>
            <div className="noticesPage__Mobile">
                <div className="noticesPageMobile__notifications">
                    <div className="formalitiesMobileForm__title">
                        <h2 className='title__NoticesTitle'>Notificaciones</h2>
                        <CiMenuKebab onClick={toggleMenu1} className="menu-icon" />
                    </div>
                    {isNotification && (
                        <div className="CardMobile__Notification">
                            {
                                notices.map(n => (
                                    // <NoticeCard 
                                    <div className="notificationsMobile__entry" key={n.id}>
                                        <p className="entryMobile__title">{
                                            `Cambio de Hora ${n.startDate < n.endDate
                                                ? n.startDate
                                                + " - "
                                                + n.endDate
                                                : n.startDate}`
                                        }</p>
                                        <p>{n.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>

                <div className="noticesPageMobile__reminders">
                    <div className="noticesPage__titleReminders">
                        <h2 className='title__RemindersTitle'>Recordatorios</h2>
                        <CiMenuKebab onClick={toggleMenu2} className="menu-icon" />
                    </div>
                    {isReminder && (
                        <div className="CardsMobile__Reminder">
                            {reminders.map((r, i) =>
                            (<div className="remindersMobile__remEntry" key={i}>
                                <div {...{ kind: r.kind }} className="remEntryMobile__icon remEntryMobile__color">
                                    <FaRegBell size={24} />
                                </div>
                                <div className="remEntry__textContainer">
                                    <p className="remEntryMobile__color" {...{ kind: r.kind }}>{r.kind}</p>
                                    <p>{r.description + ", " + dateStr(r.date)}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div></div>
        </div>

    );
}

export default NoticeMobile;