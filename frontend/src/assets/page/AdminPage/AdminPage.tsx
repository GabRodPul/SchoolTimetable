import ClassHourCrud from "#src/assets/componets/AdminComps/ClassHourCrud";
import EnrollmentCrud from "#src/assets/componets/AdminComps/EnrollmentCrud";
import GroupCrud from "#src/assets/componets/AdminComps/GroupCrud";
import IGTModuleCrud from "#src/assets/componets/AdminComps/IGTModuleCrud";
import ModuleCrud from "#src/assets/componets/AdminComps/ModuleCrud";
import SessionChangedCrud from "#src/assets/componets/AdminComps/SessionChangedCrud";
import SessionCrud from "#src/assets/componets/AdminComps/SessionCrud";
import UserCrud from "#src/assets/componets/AdminComps/UserCrud";
import WarningCrud from "#src/assets/componets/AdminComps/WarningsCrud";
import UserList from "#src/assets/componets/AdminLists/UserList";
import Header from "#src/assets/componets/CommonComps/MenuheaderMobile/Header";
import NavigationTab from "#src/assets/componets/CommonComps/navigationTab/NavigationTab";
import RigthMenu from "#src/assets/componets/CommonComps/rigthMenu/rigthMenu";
import "./AdminPageStyles.css"


function Admin() {
    return (
        <div>
            <div className="deskAdmin__nav">
                <NavigationTab />
                <RigthMenu />
            </div>
            <div className="mobileAdmin__nav">
                <Header/>
            </div>
            <div className="AdminPage__Cruds">
                <UserCrud />
                <UserList/>
                 <GroupCrud />
                <SessionCrud/>
                <ModuleCrud/>
                <IGTModuleCrud />
                <ClassHourCrud/>
                <WarningCrud/>
                <SessionChangedCrud/>
                <EnrollmentCrud/>
                
            </div>
        </div>
    );
}

export default Admin;