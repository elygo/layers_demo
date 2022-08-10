import React from 'react';
import { deleteUser, editUser } from '../components/Requests';

/**
 * Admin table inside AdminPage
 * @param {users, setUsers} object 
 * @returns 
 */
export default function AdminTable({users, setUsers}) {
    // Edit button is pressed name&role will be editable
    const handleEdit = async (e) => {
        document.getElementById(`user-role ${e.target.id}`).setAttribute("contenteditable", true);
        document.getElementById(`user-name ${e.target.id}`).setAttribute("contenteditable", true);
    }

    // Save button is pressed name&role not editable and request will be sent
    const handleSave = async (e) => {
        const nameContent = document.getElementById(`user-name ${e.target.id}`);
        const roleContent = document.getElementById(`user-role ${e.target.id}`);
        nameContent.setAttribute("contenteditable", false);
        roleContent.setAttribute("contenteditable", false);
        await editUser("http://localhost:5500/api/", e.target.id, nameContent.innerText, roleContent.innerText);
    }

    //deletes a user 
    const handleDelete = async (e) => {
        await deleteUser("http://localhost:5500/api/", e.target.id);
        setUsers(users.filter((user) => {
            return user.id != e.target.id;
        }));
    }
    return (
        //users data is iterated and injected into table
        users.map(user => {
                return (<tr key={user.id}>
                    <th scope="col">{user.id}</th>
                    <th scope="col" id={`user-name ${user.id}`}>{user.name}</th>
                    <th scope="col" id={`user-role ${user.id}`}>{user.role}</th>
                    <th scope="col">
                        <button type="button" className="btn btn-primary" id={user.id} onClick={handleEdit}>Edit</button>
                    </th>
                    <th scope="col">
                        <button type="button" className="btn btn-warning" id={user.id} onClick={handleSave}>Save</button>
                    </th>
                    <th scope="col">
                        <button type="button" className="btn btn-danger" id={user.id} onClick={handleDelete}>Delete</button>
                    </th>
                </tr>)
        })
    )
}
