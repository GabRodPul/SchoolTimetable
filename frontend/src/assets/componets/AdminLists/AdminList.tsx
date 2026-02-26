import React, { useEffect } from "react";
import "./UserList.css";
import { useApi } from "#src/api/ApiContext";
import { ApiRts } from "#common/@enums/http";
import { FetchState } from "#src/types/api";

export type AdminListProps<T> = {
  buttonName: string;
  fields: (keyof T)[];
  route: ApiRts;
};

export function AdminList<T>(props: AdminListProps<T>) {
    const [fetchData, api] = useApi<T>(props.route);
    useEffect(() => {
      if (fetchData.state == FetchState.NotStarted) api.getAll();
    }, []);
    
    return (
      <div className="userlist">
        <table className="userlist__usertable">
          <tr>
            { props.fields.map(f => {
                const firstLetter = (f as string)[0].toUpperCase();
                const rest = (f as string).substring(1);
                
                return <th>{firstLetter + rest}</th>
            }) }
            <th>
              <button className="userlist__addbtn">➕ Add {props.buttonName}</button>
              <button>Toggle</button>
            </th>
          </tr>
          {fetchData.state == FetchState.SuccessMany &&
            Array.isArray(fetchData.data) &&
            fetchData.data.map((d: T) => {
              return (
                <tr>
                  { props.fields.map(f => <td>{d[f] as string}</td>) }
                  <td>
                    <button className="userlist__editbtn">✏️ Edit</button>
                    <button className="userlist__deletebtn">🗑️ Delete</button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  };
