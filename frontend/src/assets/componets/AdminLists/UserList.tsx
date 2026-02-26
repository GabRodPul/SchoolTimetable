import React, { useEffect } from 'react';
import { Id, UserData } from '#common/@types/models';
import { UserRole } from '#common/@enums/models';
import { th, tr } from 'date-fns/locale';
import './UserList.css';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';

type User =  UserData &Id

function UserList() {
    const [users,api] = useApi<User>(ApiRts.Users)
    useEffect(()=>{
        if (users.state == FetchState.NotStarted)
            api.getAll()
    }, [])
    return (
        <div className='userlist'>
            <table className="userlist__usertable">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>
                    <button className="userlist__addbtn" >➕ Add User</button>
                    </th>
                </tr>
                {
                    users.state === FetchState.Error && <tr><td className='userlist__emptyerr' colSpan={5}>{users.error.message}
                    </td></tr>
                }
                { users.state == FetchState.SuccessMany &&
                Array.isArray(users.data) &&
                users.data.map((u:User)=> {return (
                    <tr>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber}</td>
                        <td>{u.role}</td>
                        <td>
                        <button className="userlist__editbtn">✏️ Edit</button>
                        <button className="userlist__deletebtn">🗑️ Delete</button>
                        </td>
                    </tr>

                                    

                )})}
            </table>
        </div>
    );
}

export default UserList;