import React, { useEffect, useState } from 'react';
import AdminTable from '../components/AdminTable';

/**
 * Admin page
 * @returns A content for the admin page
 */
function AdminPage() {
    const [users, setUsers] = useState([]);
    
    /**
     * requests and gets users data
     */
    useEffect(() => {
        // url of stored api
        fetch("http://localhost:5500/api/users")
            .then(response => response.json())
            .then(res => {
                setUsers(res.data.users)
            })
    },[]);

    return (
        <div className="wrapper table">
            <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Save</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <AdminTable 
                    //a component will be rendered if user's role is admin
                    users={users} 
                    setUsers={setUsers}/>
            </tbody>
            </table>
        </div>
    )
}
export default AdminPage;
