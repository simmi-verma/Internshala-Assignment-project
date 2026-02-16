import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function Dashboard() {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }

        if (user) {
            fetchTasks();
        }
    }, [user, loading, navigate]);

    const fetchTasks = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            const response = await axios.get('http://localhost:5000/api/tasks', config);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/api/tasks',
                { title, description },
                config
            );
            setTasks([...tasks, response.data]);
            setTitle('');
            setDescription('');
            toast.success('Task added');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding task');
        }
    };

    const onDelete = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting task');
        }
    };

    const onUpdateStatus = async (id, status) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            const response = await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { status },
                config
            );
            setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
            toast.success('Task updated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating task');
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='max-w-4xl mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-5'>Dashboard - Task Manager</h1>
            <p className='mb-5'>Welcome {user && user.name}</p>

            <div className="bg-white p-6 rounded shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">Add Task</h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        type='text'
                        className='border p-2 rounded'
                        placeholder='Task Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        className='border p-2 rounded'
                        placeholder='Description (Optional)'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full md:w-auto'>
                        Add Task
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
                {tasks.length > 0 ? (
                    <div className="grid gap-4">
                        {tasks.map((task) => (
                            <div key={task._id} className="border p-4 rounded flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="font-bold">{task.title}</h3>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                    <p className={`text-xs mt-1 font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {task.status.toUpperCase()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onUpdateStatus(task._id, task.status === 'completed' ? 'pending' : 'completed')}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition"
                                    >
                                        {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                                    </button>
                                    <button
                                        onClick={() => onDelete(task._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
