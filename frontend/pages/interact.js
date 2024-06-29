import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import '../styles/global.css';
import { useState , useEffect } from 'react';
import axios from 'axios';

const Interact = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [groupName, setGroupName] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');

    const handleCreateGroup = async () => {
        if (!groupName || !groupCode) {
            setError('Please fill in all fields');
            return;
        }

        if (groupCode.length !== 6) {
            setError('Code must be 6 digits');
            return;
        }

        try {
            const response = await axios.post('/api/groups/create', {
                name: groupName,
                code: groupCode
            });
            setGroups([...groups, response.data]);
            setGroupName('');
            setGroupCode('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating group');
        }
    };

    const handleJoinGroup = async () => {
        try {
            const response = await axios.post('/api/groups/join', {
                name: groupName,
                code: groupCode
            });
            // Handle successful group join, e.g., redirect to group page
        } catch (err) {
            setError(err.response?.data?.message || 'Error joining group');
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the loading duration as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 flex-col md:flex-row bg-primary dark:bg-darkBg p-8">
                <div className="w-full md:w-1/4 bg-secondary dark:bg-darkText p-4 rounded-lg shadow-md mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index} className="mb-2">
                                <div className="bg-primary dark:bg-darkBg p-2 rounded-md shadow-sm">
                                    <h3 className="text-lg font-semibold">{group.name}</h3>
                                    <p className="text-sm">Code: {group.code}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Create a Group</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="6-digit Code"
                            value={groupCode}
                            onChange={(e) => setGroupCode(e.target.value)}
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
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="6-digit Code"
                            value={groupCode}
                            onChange={(e) => setGroupCode(e.target.value)}
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
                    {/* Middle section will go here */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Interact;
