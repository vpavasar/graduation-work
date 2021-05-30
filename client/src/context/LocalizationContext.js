import {createContext} from 'react';

export const localizations = {
    RUS: 'ru-RU',
    EN: 'en-US'
}

const noop = () => {};

export const LocalizationContext = createContext({
    loacalization: null,
    toggleLoacalization: noop,
})