import {useState, useCallback, useEffect} from 'react';

const STORAGE_NAME = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userFullName, setUserFullName] = useState(null);

    const login = useCallback((jwtToken, id, userFullName) => {
        setToken(jwtToken);
        setUserId(id);
        setUserFullName(userFullName)

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            userId: id,
            token: jwtToken,
            userFullName
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(STORAGE_NAME);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME));

        if (data && data.token) {
            login(data.token, data.userId, data.userFullName);
        }
        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready, userFullName }
}
