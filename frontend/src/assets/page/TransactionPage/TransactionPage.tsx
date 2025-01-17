// import React from 'react';
import { FaSearch } from "react-icons/fa";
import './TransactionPageStyles.css'
import NoticeCard from '../../componets/Cards/NoticeCard/NoticeCard'
import { FaSearch } from 'react-icons/fa';
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

enum TransactionKind {
    OnLeave = "On Leave",
    Absence = "Absence"
};

const transactEs = {
  [TransactionKind.Absence]: "Ausencia",
  [TransactionKind.OnLeave]: "Baja",
}

type TransactionData = {
  id:           number,
  kind:         TransactionKind,
  description:  string,
  startDate:    Date,
  endDate:      Date,
  hour?:        { start: string, end: string }
}

const dateStr = (d: Date) => d.toJSON().slice(0, 10);

function TransactionsPage() {
    let   init     = false;
    const transactRef = useRef(null);

    const [transactShown, setTransactShown] = useState(false);
    const [fetchRsrc, api] = useApi<WarningData>(ApiRts.Warnings);

    const transactions: TransactionData[] = [
      {
        id: 1,
        kind:         TransactionKind.OnLeave,
        description:  "",
        startDate:    new Date("2025-01-25"),
        endDate:      new Date("2025-02-05"),
      },
      {
        id: 2,
        kind:         TransactionKind.Absence,
        description:  "",
        startDate:    new Date("2024-12-24"),
        endDate:      new Date("2024-12-24"),
        hour:         { 
          start: "15:00.00",
          end:   "19:00.00",
        }
      },
      {
        id: 3,
        kind:         TransactionKind.Absence,
        description:  "",
        startDate:    new Date("2024-12-23"),
        endDate:      new Date("2024-12-23"),
        hour:         { 
          start: "17:00.00",
          end:   "19:00.00", 
        }
      },
    ];

    const toggleHidden = (ref: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<boolean>>) => {
      const shown = ref.current?.style.display !== 'none';
      setState(shown);
      ref.current!.style.display = shown ? 'none' : 'block';      
    }

    return (
        <>
        <NavigationTab></NavigationTab>
        <RigthMenu/>
        <SearchBar />
        <div className="transactsPage">
            <div className="transactsPage__transactions">
              <div className="toggle">
                <button 
                  className="toggleButton" 
                  onClick={() => toggleHidden(transactRef, setTransactShown)}>
                    Mis Trámites
                { !transactShown && <RiArrowDownSLine />}
                { transactShown && <RiArrowRightSLine />}
                </button>
              </div>
                <h2>Trámites</h2>
                <div className="transactions__entries" ref={transactRef}>
                { 
                  transactions.map(t => (
                    // <NoticeCard 
                    <div className="transactions__entry" key={t.id}>
                        <FaRegBell {...{kind: t.kind, className: "entry__icon transactEntry--color"}}/>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                        <p className="entry__title transactEntry--color" {...{kind: t.kind}}>
                          {transactEs[t.kind]}
                        </p>
                        <p>{ 
                        ` ${transactEs[t.kind]} ${
                          t.startDate < t.endDate 
                          ? dateStr(t.startDate) 
                          + " - " 
                          + dateStr( t.endDate ) 
                          : dateStr(t.startDate) }`
                        }</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default TransactionsPage;