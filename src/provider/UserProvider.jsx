// src/AuthContext.js
import { createContext, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [type, setType] = useState(null);


    const axiosPublic = useAxiosPublic();


    const login = async (email, password, userType) => {
        const response = await axiosPublic.post('/login', { email, password, userType });

        // setUser({ credential: emailOrNumber });

        // console.log(response.data);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('type', userType);
            localStorage.setItem('email', email);

            setUser(response.data.user);
            setType(userType);
        }


        return response.data;

    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('type');
        localStorage.removeItem('email');
        setUser(null);
        setType(null);
    };

    return (
        <AuthContext.Provider value={{ user, type, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };