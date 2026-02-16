import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const navigate = useNavigate();
    const { user, register } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (register(name, email, password)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-5 text-center'>Register</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <input
                    type='text'
                    className='border p-2 rounded'
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Enter your name'
                    onChange={onChange}
                    required
                />
                <input
                    type='email'
                    className='border p-2 rounded'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Enter your email'
                    onChange={onChange}
                    required
                />
                <input
                    type='password'
                    className='border p-2 rounded'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={onChange}
                    required
                />
                <button type='submit' className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Register;
