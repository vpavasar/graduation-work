import {createContext} from 'react';

export const localizations = {
    RUS: 'rus',
    EN: 'en'
}

const noop = () => {};

export const LocalizationContext = createContext({
    loacalization: null,
    toggleLoacalization: noop,
})