import React, { useEffect } from "react";
import "./UserList.css";
import { useApi } from "#src/api/ApiContext";
import { ApiRts } from "#common/@enums/http";
import { FetchState } from "#src/types/api";
import i18n from "#src/i18n";

export type AdminListProps<T> = {
  fields: (keyof T)[];
  route: ApiRts;
};

export function AdminList<T>(props: AdminListProps<T>) {
    const [fetchData, api] = useApi<T>(props.route);
    useEffect(() => {
      if (fetchData.state == FetchState.NotStarted) api.getAll();
    }, []);
    
    const _noIdFields = props.fields.filter(f => f as string !== "id");
    const { t } = i18n;
    const tKey = `components.AdminList.th.${props.route}`;

    return (
      <div className="userlist">
        <table className="userlist__usertable">
          <tbody>
          <tr>
            { <th>{t("components.AdminList.th.id")}</th> }
            { _noIdFields.map(f => {
                return <th key={f as string}>{t(`${tKey}.${f as string}`)}</th>
            }) }
            <th>
              <button className="userlist__addbtn">➕ {t(`components.AdminList.add`)} {t(`${tKey}.__title`)}</button>
              {/* <button>Toggle</button> */}
            </th>
          </tr>
          {fetchData.state == FetchState.SuccessMany &&
            Array.isArray(fetchData.data) &&
            fetchData.data.map((d: T) => {
              return (
                <tr key={(d as any).id}>
                  { props.fields.map(f => <td key={f as string}>{d[f] as string}</td>) }
                  <td>
                    <button className="userlist__editbtn">✏️ {t(`components.AdminList.edit`)}</button>
                    <button className="userlist__deletebtn">🗑️ {t(`components.AdminList.delete`)}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>  
        </table>
      </div>
    );
  };
