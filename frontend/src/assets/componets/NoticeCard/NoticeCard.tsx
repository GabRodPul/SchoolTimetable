import React, { useState } from 'react';
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import NoticeDay from '../NoticeDayEjm/NoticeDay';
import './NoticeCardStyles.css';

const NoticeCard = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // function changeArrow() {
  //   if (isMenuOpen) {
  //     <FaArrowDown className='changeContainer__arrow' onClick={toggleMenu} />
  //   }
  //   <FaArrowRight className='changeContainer__arrow' onClick={toggleMenu} />;
  // }

  return (
    <>
      <div className="noticeDayContent">

        <div className="noticeInfo">
          <p className="noticeInfo__title">Cambio de Hora 06/02/2024</p>
          <div className="noticeInfo__Display">
            <p className="noticeInfo__message">Se ha realizado un cambio en el horario</p>
            <FaArrowRight className='noticeInfo__arrow' onClick={toggleMenu} />
          </div>
        </div>

        <div className="noticeContent">
          {isMenuOpen && (
            <div className="noticeContent__container">
              <div className="noticeTime">
                <p className="noticeTime__title">Horario</p>
              </div>
              <div className="notices">
                <NoticeDay />
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default NoticeCard;