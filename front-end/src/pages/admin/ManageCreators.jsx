import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const ManageCreators = () => {
    const [creators, setCreators] = useState([]);
    const [newCreator, setNewCreator] = useState({ id: null, name: '', email: '' });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch existing creators from the API
        fetch('http://localhost:8080/api/getAllRegUser')
            .then(response => response.json())
            .then(data => setCreators(data))
            .catch(() => setError('Failed to fetch creators'));
    }, []);

    const addOrUpdateCreator = () => {
        if (!newCreator.name || !newCreator.email) {
            setError('Both name and email are required');
            return;
        }
        const apiUrl = editMode ? `/api/creators/${newCreator.id}` : '/api/creators';
        const method = editMode ? 'PUT' : 'POST';

        fetch(apiUrl, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCreator),
        })
            .then(response => response.json())
            .then(data => {
                setCreators(editMode
                    ? creators.map(creator => (creator.id === data.id ? data : creator))
                    : [...creators, data]);
                setNewCreator({ id: null, Role: '', email: '' });
                setEditMode(false);
                setSuccess(editMode ? 'Creator updated successfully!' : 'Creator added successfully!');
                setError('');
            })
            .catch(() => setError('Failed to save creator'));
    };

    const deleteCreator = (id) => {
        fetch(`/api/creators/${id}`, { method: 'DELETE' })
            .then(() => {
                setCreators(creators.filter(creator => creator.id !== id));
                setSuccess('Creator deleted successfully!');
            })
            .catch(() => setError('Failed to delete creator'));
    };

    const editCreator = (creator) => {
        setNewCreator(creator);
        setEditMode(true);
        setSuccess('');
        setError('');
    };

    return (
        <div className="admin-container">
            <h1 className="admin-header">Manage Creators

            <div className="nav">
                    <a href="/admin/manage-creators">Manage Creators</a>
                    <a href="/admin/report-post-status">Report Posts</a>
                    <a href="/admin/view-all-posts">View All Posts</a>
                </div>
            </h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {/* Creator Form */}
            <div>
                <input
                    type="text"
                    placeholder="Role"
                    value={newCreator.role}
                    onChange={(e) => setNewCreator({ ...newCreator, role: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newCreator.email}
                    onChange={(e) => setNewCreator({ ...newCreator, email: e.target.value })}
                />
                <button onClick={addOrUpdateCreator}>
                    {editMode ? 'Update Creator' : 'Add Creator'}
                </button>
            </div>

            {/* Creator List */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creators.map((creator) => (
                            <tr key={creator.id}>
                                <td>{creator.regId}</td>
                                <td>{creator.role}</td>
                                <td>{creator.email}</td>
                                <td>
                                    <button className="edit" onClick={() => editCreator(creator)}>
                                        Edit
                                    </button>
                                    <button className="danger" onClick={() => deleteCreator(creator.id)}>
                                        Delete
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

export default ManageCreators;
