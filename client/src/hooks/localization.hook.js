import {useState, useCallback, useEffect} from 'react';
import {localizations} from '../context/LocalizationContext';

const STORAGE_NAME = 'localization';

export const useLoacalization = () => {
    const [localization, setLocalization] = useState(localizations.EN);

    const toggleLoacalization = useCallback(local => {
        setLocalization(local);

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            language: local
        }))
    }, []);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem(STORAGE_NAME));

        if (local && local.language) {
            toggleLoacalization(local.language);
        }
    })

    return { localization, toggleLoacalization }
}
