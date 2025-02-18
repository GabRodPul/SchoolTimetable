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
import CollapsibleSection from "#src/assets/componets/AdminLists/CollapsibleSection";
import Header from "#src/assets/componets/CommonComps/MenuheaderMobile/Header";
import NavigationTab from "#src/assets/componets/CommonComps/navigationTab/NavigationTab";
import RigthMenu from "#src/assets/componets/CommonComps/rigthMenu/rigthMenu";
import "./AdminPageStyles.css";

function Admin() {
    return (
        <div>
            <div className="deskAdmin__nav">
                <NavigationTab />
                <RigthMenu />
            </div>
            <div className="mobileAdmin__nav">
                <Header />
            </div>
            <div className="AdminPage__Cruds">

                <CollapsibleSection title="Usuarios">
                    <AdminList
                        buttonName="Usuario"
                        fields={["id", "name", "email", "phoneNumber", "role"]}
                        route={ApiRts.Users}
                        FormComponent={UserCrud}
                    />

                </CollapsibleSection>

                <CollapsibleSection title="Grupos">
                    <AdminList
                        buttonName="Grupo"
                        fields={["id", "name"]}
                        route={ApiRts.Groups}
                        FormComponent={GroupCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Sesiones">
                    <AdminList
                        buttonName="Sesión"
                        fields={["id", "classHourId", "igtModuleId", "day"]}
                        route={ApiRts.Session}
                        FormComponent={SessionCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Módulos">
                    <AdminList
                        buttonName="Módulo"
                        fields={["id", "name"]}
                        route={ApiRts.Modules}
                        FormComponent={ModuleCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="IGT Módulos">
                    <AdminList
                        buttonName="IGT Módulo"
                        fields={["id", "teacherId", "groupId", "moduleId", "weeklyHours"]}
                        route={ApiRts.IGT_modules}
                        FormComponent={IGTModuleCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Horas de clase">
                    <AdminList
                        buttonName="Hora de clase"
                        fields={["id", "turn", "sessionHour", "start", "end"]}
                        route={ApiRts.ClassHour}
                        FormComponent={ClassHourCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Avisos">
                    <AdminList
                        buttonName="Aviso"
                        fields={["id", "teacherId", "description", "startDate", "endDate", "startHour", "endHour"]}
                        route={ApiRts.Warnings}
                        FormComponent={WarningCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Cambios de Sesion">
                    <AdminList
                        buttonName="Cambio de Sesion"
                        fields={["id", "sessionId", "classHourId", "day", "startDate", "endDate"]}
                        route={ApiRts.SessionChanged}
                        FormComponent={SessionChangedCrud}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Matriculas">
                    <EnrollmentCrud />
                    {/* <AdminList
                        buttonName="Session Changed"
                        fields={["id", "sessionId", "classHourId", "day", "startDate", "endDate"]}
                        route={ApiRts.Enrollmet}
                    /> */}
                </CollapsibleSection>

            </div>
        </div>
    );
}

export default Admin;
