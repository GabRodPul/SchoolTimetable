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
        </div>
    );
}

export default Admin;