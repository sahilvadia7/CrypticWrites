import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const ManageApplication = () => {
    const [applications, setApplications] = useState([]);
    const [newApplication, setNewApplication] = useState({ id: null, token: '', status: '' });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch existing applications from the API
        fetch('http://localhost:8080/api/getAllToken')
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(() => setError('Failed to fetch applications'));
    }, []);

   
    const handleApproval = (id) => {
        fetch(`http://localhost:8080/api/updateTokenStatus/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'approved' }),
        })
            .then(response => response.json())
            .then(() => {
                setApplications(applications.map(app => (app.id === id ? { ...app, status: 'approved' } : app)));
                setSuccess('Application approved successfully!');
                setError('');
            })
            .catch(() => setError('Failed to update application status'));
    };

    const handleRejection = (id) => {
        fetch(`http://localhost:8080/api/deleteToken/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setApplications(applications.filter(app => app.id !== id));
                setSuccess('Application rejected and deleted successfully!');
                setError('');
            })
            .catch(() => setError('Failed to delete application'));
    };

   

    return (
        <div className="admin-container">
            <h1 className="admin-header">Manage Applications <div className="nav">
                <a href="/admin/manage-creators">Manage Creators</a>
                {/* <a href="/admin/ManageApplication">Manage Application</a> */}
                <a href="/admin/report-post-status">Report Posts</a>
                <a href="/admin/view-all-posts">View All Posts</a>
            </div></h1>
            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

           

            {/* Applications List */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Token</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>{application.token}</td>
                                <td>{application.status}</td>
                                <td>
                                    <button
                                        className="approve"
                                        onClick={() => handleApproval(application.id)}
                                        disabled={application.status === 'approved'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject"
                                        onClick={() => handleRejection(application.id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageApplication;
