import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [name, setName] = useState(localStorage.getItem("name"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);



    const login = (token, role, name) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        setToken(token);
        setRole(role);
        setName(name);
    };


    const logout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, name, login, logout }}>

            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
