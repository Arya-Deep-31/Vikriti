// frontend/pages/Interact.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import '../styles/global.css';

const Interact = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [isLoading, setIsLoading] = useState(true);
    const [createGroupName, setCreateGroupName] = useState('');
    const [createGroupCode, setCreateGroupCode] = useState('');
    const [joinGroupName, setJoinGroupName] = useState('');
    const [joinGroupCode, setJoinGroupCode] = useState('');
    const [deleteGroupCode, setDeleteGroupCode] = useState('');
    const [groupToDelete, setGroupToDelete] = useState(null);
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('/api/groups');
                setGroups(response.data.groups); // Assuming response structure has a 'groups' array
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching groups');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroups();

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the loading duration as needed

        return () => clearTimeout(timer);
    }, []);

    const handleCreateGroup = async () => {
        if (!createGroupName || !createGroupCode) {
            setError('Please fill in all fields');
            return;
        }

        if (createGroupCode.length !== 6) {
            setError('Code must be 6 digits');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/groups/create`,
                { name: createGroupName, code: createGroupCode }
            );
            setGroups([...groups, response.data]); // Assuming response.data is the new group object
            setCreateGroupName('');
            setCreateGroupCode('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating group');
        }
    };

    const handleJoinGroup = async () => {
        if (!joinGroupName || !joinGroupCode) {
            setError('Please fill in all fields');
            return;
        }
    
        try {
            const response = await axios.post(`${backendUrl}/api/groups/join`, {
                name: joinGroupName,
                code: joinGroupCode
            });
    
            if (response.data.success) {
                setJoinGroupName('');
                setJoinGroupCode('');
                setError('');
            } else {
                setError('Group not found or incorrect credentials');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error joining group');
        }
    };
    

    const handleDeleteGroup = async () => {
        if (!deleteGroupCode || !groupToDelete) {
            setError('Please select a group and enter the group code to delete');
            return;
        }
    
        if (deleteGroupCode !== groupToDelete.code) {
            setError('The code does not match the group code');
            return;
        }
    
        try {
            await axios.delete(`${backendUrl}/api/groups/delete`, {
                data: { code: deleteGroupCode }
            });
            setGroups(groups.filter(group => group.code !== deleteGroupCode));
            setDeleteGroupCode('');
            setGroupToDelete(null);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting group');
        }
    };
    

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 flex-col md:flex-row bg-primary dark:bg-darkBg p-8">
                <div className="w-full md:w-1/2 bg-secondary dark:bg-darkText p-4 rounded-lg shadow-md mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index} className="mb-2">
                                <div className="bg-primary dark:bg-darkBg p-2 rounded-md shadow-sm">
                                    <h3 className="text-lg font-semibold">{group.name}</h3>
                                    <p className="text-sm">Code: {group.code}</p>
                                    <button
                                        onClick={() => setGroupToDelete(group)}
                                        className="bg-red-500 text-white p-2 rounded-md mt-2"
                                    >
                                        Delete Group
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {groupToDelete && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">Confirm Delete Group</h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <p>Enter the code to delete the group "{groupToDelete.name}" :</p>
                            <input
                                type="password"
                                placeholder="6-digit Code"
                                value={deleteGroupCode}
                                onChange={(e) => setDeleteGroupCode(e.target.value)}
                                className="w-full p-2 mb-2 border rounded-md"
                            />
                            <button
                                onClick={handleDeleteGroup}
                                className="w-full bg-red-500 text-white p-2 rounded-md"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    )}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Create a Group</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={createGroupName}
                            onChange={(e) => setCreateGroupName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="6-digit Code"
                            value={createGroupCode}
                            onChange={(e) => setCreateGroupCode(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <button
                            onClick={handleCreateGroup}
                            className="w-full bg-contrastYellow text-white p-2 rounded-md"
                        >
                            Create Group
                        </button>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Join a Group</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={joinGroupName}
                            onChange={(e) => setJoinGroupName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="6-digit Code"
                            value={joinGroupCode}
                            onChange={(e) => setJoinGroupCode(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <button
                            onClick={handleJoinGroup}
                            className="w-full bg-contrastBlue text-white p-2 rounded-md"
                        >
                            Join Group
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    {/* Middle section content goes here */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Interact;

