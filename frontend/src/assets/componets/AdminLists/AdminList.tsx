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
    
    const { t } = i18n;

    return (
      <div className="userlist">
        <table className="userlist__usertable">
          <tbody>
          <tr>
            { props.fields.map(f => {
                return <th key={f as string}>{t(`common.data.fields.${f as string}`)}</th>
            }) }
            <th>
              <button className="userlist__addbtn">➕ {t(`common.actions.add`)} {t(`common.data.tablesSingle.${props.route}`)}</button>
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
                    <button className="userlist__editbtn">✏️ {t(`common.actions.edit`)}</button>
                    <button className="userlist__deletebtn">🗑️ {t(`common.actions.delete`)}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>  
        </table>
      </div>
    );
  };
