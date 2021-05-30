import 'date-fns';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './DateFilter.css';

const localeMap = {
  'en-US': enLocale,
  'ru-RU': ruLocale,
};

const localeCancelLabelMap = {
  'en-US': "cancel",
  'ru-RU': "отмена",
};

const localeFormatMap = {
  'en-US': "MM/d/yyyy",
  'ru-RU': "dd.MM.yyyy",
};

export const DateFilter = ({language, localizations}) => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(new Date());

  const handleDateChangeDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateChangeDateTo = (date) => {
    setDateTo(date);
  };

  return (
    <div className='date-filter'>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language]}>
            <Grid container direction="column">
                <Typography>{language === localizations.EN ? 'Release Dates' : 'Дата выхода'}</Typography>
                <KeyboardDatePicker
                  format={localeFormatMap[language]}
                  cancelLabel={localeCancelLabelMap[language]}
                  margin="normal"
                  id="date-picker-dialog1"
                  label={language === localizations.EN ? 'from' : 'от'}
                  value={dateFrom}
                  onChange={handleDateChangeDateFrom}
                  KeyboardButtonProps={{
                      'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label={language === localizations.EN ? 'to' : 'до'}
                  format={localeFormatMap[language]}
                  cancelLabel={localeCancelLabelMap[language]}
                  value={dateTo}
                  onChange={handleDateChangeDateTo}
                  KeyboardButtonProps={{
                      'aria-label': 'change date',
                  }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    </div>
  );
}
