// import React from 'react';
import './NoticesPageStyles.css'
import NavigationTab from "#src/assets/componets/CommonComps/navigationTab/NavigationTab";
import RigthMenu from "#src/assets/componets/CommonComps/rigthMenu/rigthMenu";
import Header from "#src/assets/componets/CommonComps/MenuheaderMobile/Header";
import NoticeDesktop from "#src/assets/componets/NoticeComps/Desktop/NoticesCompDesktop";
import NoticeMobile from "#src/assets/componets/NoticeComps/Mobile/NoticeCompMobile";

function NoticesPage() {

  return (
    <div>
      <div className="desktop__NoticesPage">
        <NavigationTab />
        <RigthMenu />
        <NoticeDesktop />
      </div>
      <div className="mobile__NoticesPage">
        <Header />
        <NoticeMobile />
      </div>
    </div>
  );
}

export default NoticesPage;