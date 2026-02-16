import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className='flex justify-between items-center py-4 mb-4 border-b border-gray-200'>
            <div className='text-xl font-bold'>
                <Link to='/'>TaskApp</Link>
            </div>
            <div>
                {user ? (
                    <div className='flex items-center gap-4'>
                        <span>Welcome, {user.name}</span>
                        <button
                            onClick={onLogout}
                            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-4'>
                        <Link
                            to='/login'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
