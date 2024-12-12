import GroupCrud from "#src/assets/componets/AdminComps/GroupCrud";
import ModuleCrud from "#src/assets/componets/AdminComps/ModuleCrud";
import SessionCrud from "#src/assets/componets/AdminComps/SessionCrud";
import UserCrud from "#src/assets/componets/AdminComps/UserCrud";
import NavigationTab from "#src/assets/componets/CommonComps/navigationTab/NavigationTab";
import RigthMenu from "#src/assets/componets/CommonComps/rigthMenu/rigthMenu";
import "./AdminPageStyles.css"


function Admin() {
    return (
        <div>
            <NavigationTab/>
            <RigthMenu/>
            <UserCrud/>
            <GroupCrud/>
            <SessionCrud/>
            <ModuleCrud/>
        </div>
    );
}

export default Admin;