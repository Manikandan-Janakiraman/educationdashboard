import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const loggedInUser = authService.login(email, password);
        if (loggedInUser) {
            setUser(loggedInUser);
            return true;
        }
        return false;
    };

    const register = (userData) => {
        try {
            const newUser = authService.register(userData);
            setUser(newUser);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
