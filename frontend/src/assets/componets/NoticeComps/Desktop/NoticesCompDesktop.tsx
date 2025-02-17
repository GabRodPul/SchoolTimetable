// import React from 'react';
import { FaSearch } from "react-icons/fa";
import "./NoticesCompDesktopStyles.css"
import NoticeCard from '.././../Cards/NoticeCard/NoticeCard'
import { Dispatch, Ref, RefObject, SetStateAction, useRef, useState } from 'react';
import { Id, WarningData } from '#common/@types/models';
import NavigationTab from "#src/assets/componets/CommonComps/navigationTab/NavigationTab";
import { FaRegBell } from "react-icons/fa";
import { RiArrowUpSLine, RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useApi } from "#src/api/ApiContext";
import RigthMenu from "#src/assets/componets/CommonComps/rigthMenu/rigthMenu";
import { ApiRts } from "#common/@enums/http";
import SearchBar from "#src/assets/componets/CommonComps/SearchBarheader/SearchBarheader";
import Header from "#src/assets/componets/CommonComps/MenuheaderMobile/Header";
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

const NoticeDesktop: React.FC = () => {
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

    return (
        <div>
            <div className="desk__menu">
                <div className="noticesPage">
                    <div className="noticesPage__notifications">
                        <div className="noticesPage__DeskTittle">
                            <h2>Notificaciones</h2>
                        </div>
                        {
                            notices.map(n => (
                                // <NoticeCard 
                                <div className="notifications__entry" key={n.id}>
                                    <p className="entry__title">{
                                        `Cambio de Hora ${n.startDate < n.endDate
                                            ? n.startDate
                                            + " - "
                                            + n.endDate
                                            : n.startDate}`
                                    }</p>
                                    <p>{n.description}</p>
                                </div>
                            ))}
                    </div>
                    <div className="noticesPage__reminders">
                        <h2>Recordatorios</h2>
                        {reminders.map((r, i) =>
                        (<div className="reminders__remEntry" key={i}>
                            <div {...{ kind: r.kind }} className="remEntry__icon remEntry--color">
                                <FaRegBell size={24} />
                            </div>
                            <div className="remEntry__textContainer">
                                <p className="remEntry--color" {...{ kind: r.kind }}>{r.kind}</p>
                                <p>{r.description + ", " + dateStr(r.date)}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeDesktop;