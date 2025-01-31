import { ApiRts } from "#common/@enums/http";
import ClassHourCrud from "#src/assets/componets/AdminComps/ClassHourCrud";
import EnrollmentCrud from "#src/assets/componets/AdminComps/EnrollmentCrud";
import GroupCrud from "#src/assets/componets/AdminComps/GroupCrud";
import IGTModuleCrud from "#src/assets/componets/AdminComps/IGTModuleCrud";
import ModuleCrud from "#src/assets/componets/AdminComps/ModuleCrud";
import SessionChangedCrud from "#src/assets/componets/AdminComps/SessionChangedCrud";
import SessionCrud from "#src/assets/componets/AdminComps/SessionCrud";
import UserCrud from "#src/assets/componets/AdminComps/UserCrud";
import WarningCrud from "#src/assets/componets/AdminComps/WarningsCrud";
import { AdminList } from "#src/assets/componets/AdminLists/AdminList";
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
                <AdminList 
                    buttonName="User" 
                    fields={["id", "name", "email", "phoneNumber", "role"]}
                    route={ApiRts.Users}
                />

                <GroupCrud />
                <AdminList
                    buttonName="Group"
                    fields={["id", "name"]}
                    route={ApiRts.Groups}
                />

                <SessionCrud/>
                <AdminList
                    buttonName="Session"
                    fields={["id", "classHourId", "igtModuleId","day"]}
                    route={ApiRts.Session}
                />
                
                <ModuleCrud/>
                <AdminList
                    buttonName="Module"
                    fields={["id", "name"]}
                    route={ApiRts.Modules}
                />

                <IGTModuleCrud />
                <AdminList
                    buttonName="IGT Module"
                    fields={["id", "teacherId", "groupId", "moduleId" ,"weeklyHours"]}
                    route={ApiRts.IGT_modules}
                />

                <ClassHourCrud/>
                <AdminList
                    buttonName="Class Hour"
                    fields={["id", "turn", "sessionHour", "start", "end"]}
                    route={ApiRts.ClassHour}
                />

                <WarningCrud/>
                <AdminList
                    buttonName="Warning"
                    fields={["id", "teacherId", "description", "startDate", "endDate", "startHour", "endHour"]}
                    route={ApiRts.Warnings}
                />

                <SessionChangedCrud/>
a               <AdminList
                    buttonName="Session Changed"
                    fields={["id", "sessionId", "classHourId", "day", "startDate", "endDate"]}
                    route={ApiRts.SessionChanged}
                />

                <EnrollmentCrud/>
                
            </div>
        </div>
    );
}

export default Admin;